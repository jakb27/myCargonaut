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
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {getAuth, sendEmailVerification} from "@angular/fire/auth";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  userFirebase: firebase.User | null = null;
  userData!: User;
  private readonly authState = new Subject<firebase.User | null>();

  profilePic: any;
  filePath = "/profilePictures/";

  storage = getStorage(); //TODO

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private afStorage: AngularFireStorage,
    public router: Router,
    public ngZone: NgZone,
    public alertService: AlertService
  ) {

    if (!environment.production) {
      afAuth.useEmulator("http://localhost:9099");
      firebase.storage().useEmulator("localhost", 9199);
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
      .then(async (result) => {
        if (result.user) {
          const token = result.user.getIdToken(true);
          localStorage.setItem("token", JSON.stringify(token));
          // this.ngZone.run(() => {
          //   this.router.navigate(["dashboard"]).then( () => {
          //     // window.location.reload();
          //   });
          // });

          // TODO
          await this.router.navigate(["dashboard"]);
          await this.payPending();

        }
      }).catch((error) => {
        this.alertService.nextAlert({type: "danger", message: error.message});
      });
  }

  // Sign up with email/password
  signUp(firstname: string, lastname: string, birthday: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        await this.SendVerificationMail(); //TODO verification email
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
        await this.afs.collection("/users").doc(uid).set(user).then(async () => {
          await this.afs.collection("/pendingCredits").doc(uid).set({
            pending: 0
          });
          // TODO standard pic setzen
          await this.router.navigate(["dashboard"]).then(() => {
            window.location.reload();
            this.afStorage.storage.ref(this.filePath + "placeholder.jpg").getDownloadURL().then((res) => {
              this.userData.photoURL = res;
              console.log(this.editUser(this.userData));
            });
          });
        });
      }).catch((error) => {
        this.alertService.nextAlert({type: "danger", message: error.message});
      });
  }

  // Send email verification when new user sign up
  async SendVerificationMail() {
    sendEmailVerification(getAuth().currentUser!).then(() => {
    });
  }

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

  async getUserData(): Promise<void> {
    return new Promise((resolve) => {
      if (this.userData) {
        resolve();
      } else {
        this.authState.asObservable().subscribe(async (res) => {
          if (res) {
            this.userFirebase = res;
            await this.afs.doc(`users/${this.userFirebase.uid}`).get().subscribe(async (res) => {
              if (res) {
                this.userData = {
                  uid: await res.get("uid"),
                  firstname: await res.get("firstname"),
                  lastname: await res.get("lastname"),
                  birthday: await res.get("birthday"),
                  email: await res.get("email"),
                  emailVerified: await res.get("emailVerified"),
                  displayName: await res.get("displayName"),
                  rating: await res.get("rating"),
                  ratings: await res.get("ratings"),
                  photoURL: await res.get("photoURL"),
                  credit: await res.get("credit")
                };
              }
              resolve();
            });
          }
        });
      }
    });

  }

  // Sign out
  signOut() {
    return this.afAuth.signOut().then(async () => {
      localStorage.removeItem("token");
      await this.router.navigate(["sign-in"]);
    });
  }

  async deleteUser() {
    await this.afs.collection("/users").doc(this.userData!.uid).delete();
    // await this.afs.doc("/users" + this.userData!.uid + "/vehicles").delete();
    await firebase.auth().currentUser?.delete();
    await this.signOut();
  }

  async editUser(u: User) {
    await this.afs.collection("/users").doc(this.userData!.uid).set(u, {
      merge: true
    });
  }

  // ugly
  async getUserRating(): Promise<void> {
    new Promise<void>((resolve) => {
      const queryRatings = query(collection(this.afs.firestore, "cases"),
        where("publisher_uid", "==", this.userData.uid),
        where("status", "==", "finished"));

      onSnapshot(queryRatings, (querySnapshot) => {
        let ratings: number[] = [];
        querySnapshot.forEach((doc) => {
          ratings.push((doc.data() as Case).rating);
        });
        if (ratings.length > 0) {
          this.userData.ratings = ratings.length;
          this.userData.rating = ratings.reduce((a, b) => a + b) / ratings.length;
        }
        resolve();
      });
    });
  }

  async uploadProfilePic(file: any) {
    this.afStorage.upload(this.filePath + this.userData.uid, file).then((task) => {
      task.ref.getDownloadURL().then(async (res) => {
        this.userData.photoURL = res;
        await this.editUser(this.userData);
      });
    });
  }

  async deleteProfilePic() {
    this.afStorage.storage.ref(this.filePath + this.userData.uid).delete().then(() => {
      this.afStorage.storage.ref(this.filePath + "placeholder.jpg").getDownloadURL().then((res) => {
        this.userData.photoURL = res;
        this.editUser(this.userData);
      });
    });
  }

  // circular dependency in creditService?
  async payPending() {
    let publisherPending = await this.afs.firestore.collection("pendingCredits").doc(this.userData.uid).get();
    let pendingCredit = publisherPending.data()!["pending"];
    console.log(pendingCredit);
    await this.afs.collection("/pendingCredits").doc(this.userData.uid).update({
      pending: 0
    });
    let publisher = await this.afs.firestore.collection("/users").doc(this.userData.uid).get();
    let publisherCredit = publisher.data()!["credit"];
    console.log(publisherCredit);
    await this.afs.collection("/users").doc(this.userData.uid).update({
      credit: publisherCredit + pendingCredit
    });
  }


}
