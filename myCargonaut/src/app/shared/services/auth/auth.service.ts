import {Injectable, NgZone} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../../models/user";
import firebase from "firebase/compat/app";
import {environment} from "../../../../environments/environment";
import {AlertService} from "../alerts/alerts.service";
import {Subject} from "rxjs";
import {getStorage} from "@angular/fire/storage";
import {collection, onSnapshot, query, where} from "@angular/fire/firestore";
import {Case} from "../../models/case";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  userFirebase: firebase.User | null = null;
  userData!: User;
  private readonly authState = new Subject<firebase.User | null>();

  storage = getStorage(); //TODO

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public alertService: AlertService
  ) {

    if (!environment.production) {
      afAuth.useEmulator("http://localhost:9099");
    }

    /* Saving user data in localstorage when
    logged in and setting up empty when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userFirebase = user;
        const token = this.userFirebase.getIdToken(true);
        localStorage.setItem("token", JSON.stringify(token));
        this.authState.next(user);
      } else {
        this.userFirebase = null;
        localStorage.clear();
        this.authState.next(null);
      }
    });
  }

  // Sign in with email/password
  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        if (result.user) {
          const token = result.user.getIdToken(true);
          localStorage.setItem("token", JSON.stringify(token));

          this.ngZone.run(() => {
            this.router.navigate(["dashboard"]);
          });
        }
      }).catch((error) => {
        this.alertService.nextAlert({type: "danger", message: error.message});
      });
  }

  // Sign up with email/password
  signUp(firstname: string, lastname: string, birthday: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        // this.SendVerificationMail(); //TODO verification email
        const token = result.user!.getIdToken(true);
        localStorage.setItem("token", JSON.stringify(token));
        const {emailVerified, uid} = result.user!;
        const user = {
          uid,
          firstname,
          lastname,
          birthday,
          email,
          emailVerified,
          displayName: firstname + " " + lastname,
          photoURL: "",
          rating: 0,
          ratings: 0,
          credit: 0
        };
        await this.afs.collection("/users").doc(uid).set(user).then(() => {
          this.router.navigate(["dashboard"]);
        });
      }).catch((error) => {
        this.alertService.nextAlert({type: "danger", message: error.message});
      });
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //     .then(() => {
  //       this.router.navigate(['verify-email-address']);
  //     })
  // }

  // Reset Forgot password
  forgotPassword(passwordResetEmail: string) {
    return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert("Password reset email sent, check your inbox.");
      }).catch((error) => {
        window.alert(error);
      });
  }

  // Returns true when user is logged in and email is verified
  get isLoggedIn(): boolean {
    const token = JSON.parse(<string>localStorage.getItem("token"));
    // return (user !== null && user.emailVerified !== false); // TODO
    return (token !== null);
  }

  // Auth logic to run auth providers
  // AuthLogin(provider: firebase.auth.AuthProvider) {
  //   return this.afAuth.signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //       this.SetUserData(result.user!);
  //     }).catch((error) => {
  //       window.alert(error)
  //     })
  // }

  getUserData(): void {
    this.authState.asObservable().subscribe((res) => {
      if (res) {
        this.userFirebase = res;
        this.afs.doc(`users/${this.userFirebase.uid}`).get().subscribe((res) => {
          if (res) {
            this.userData = {
              uid: res.get("uid"),
              firstname: res.get("firstname"),
              lastname: res.get("lastname"),
              birthday: res.get("birthday"),
              email: res.get("email"),
              emailVerified: res.get("emailVerified"),
              displayName: res.get("displayName"),
              rating: res.get("rating"),
              ratings: res.get("ratings"),
              photoURL: res.get("photoURL"),
              credit: res.get("credit")
            };
            // console.log(this.userData);
          }
        });
      }
    });
  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("token");
      this.router.navigate(["sign-in"]);
    });
  }

  async deleteUser() {
    await this.afs.collection("/users").doc(firebase.auth().currentUser?.uid).delete();
    await firebase.auth().currentUser?.delete();
    await this.signOut();
  }

  async editUser(u: User) {
    await this.afs.collection("/users").doc(this.userData!.uid).set(u, {
      merge: true
    });
  }

  // ugly
  async getUserRating() {
    const queryRatings = query(collection(this.afs.firestore, "cases"),
      where("publisher_uid", "==", this.userData.uid),
      where("rating", "!=", "0"));

    onSnapshot(queryRatings, (querySnapshot) => {
      let ratings: number[] = [];
      querySnapshot.forEach((doc) => {
        ratings.push((doc.data() as Case).rating);
      });
      if(ratings.length > 0) {
        this.userData.ratings = ratings.length;
        this.userData.rating = ratings.reduce((a, b) => a + b) / ratings.length;
      }
    });
  }


}
