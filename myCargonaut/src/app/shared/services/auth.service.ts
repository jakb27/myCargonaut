import {Injectable, NgZone} from "@angular/core";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {User} from "../models/user";
import firebase from "firebase/compat";
import {environment} from "../../../environments/environment";
import {AlertService} from "./alerts.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  userFirebase: firebase.User | null = null;
  userData!: User;
  private readonly authState = new Subject<firebase.User | null>();

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
  SignIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log(result);
        if(result.user){
          const token = result.user.getIdToken(true);
          localStorage.setItem("token", JSON.stringify(token));

          this.ngZone.run(() => {
            this.router.navigate(["dashboard"]);
          });
        }
        // this.SetUserData(result.user!).then(r => {
        //   this.ngZone.run(() => {
        //     this.router.navigate(["dashboard"]);
        //   });
        // });

      }).catch((error) => {
        this.alertService.nextAlert({type: "danger", message: error.message});
      });
  }

  // Sign up with email/password
  SignUp(firstname: string, lastname: string, birthday: string, email: string, password: string) {
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
  ForgotPassword(passwordResetEmail: string) {
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
      if(res) {
        this.userFirebase = res;
        this.afs.doc(`users/${this.userFirebase.uid}`).get().subscribe((res) => {
          if(res) {
            this.userData = {
              uid: res.get("uid"),
              firstname: res.get("firstname"),
              lastname: res.get("lastname"),
              birthday: res.get("birthday"),
              email: res.get("email"),
              emailVerified: res.get("emailVerified"),
              displayName: res.get("displayName"),
              rating: res.get("rating"),
              photoURL: res.get("photoURL"),
              credit: res.get("credit")
            };
            // console.log(this.userData);
          }
        });
      }
    });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user: firebase.User) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email!,
  //     displayName: user.displayName!,
  //     emailVerified: user.emailVerified,
  //   };
  //   return userRef.set(userData, {
  //     merge: true
  //   });
  // }

  // SetUserData(user: firebase.User, firstname: string, lastname: string, birthday: string) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email!,
  //     displayName: firstname + " " + lastname,
  //     emailVerified: user.emailVerified,
  //     firstname: firstname,
  //     lastname: lastname,
  //     birthday: birthday
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem("token");
      this.router.navigate(["sign-in"]);
    });
  }

  async deleteUser() {
    await this.SignOut();
    await this.afs.collection("/users").doc(this.userData!.uid).delete();
  }

  async editUser() {

  }


}
