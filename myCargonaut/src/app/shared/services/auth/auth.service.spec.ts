import {TestBed} from "@angular/core/testing";

import {AuthService} from "./auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {RouterTestingModule} from "@angular/router/testing";
import firebase from "firebase/compat";

describe("AuthService", () => {
  let service: AuthService;

  let testUser = {
    uid: "test123",
    firstname: "test",
    lastname: "muster",
    birthday: "01012001",
    email: "test@gmail.com",
    emailVerified: false,
    displayName: "test",
    rating: 0,
    ratings: 0,
    photoURL: "",
    credit: 0
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [
        AngularFireAuth
      ]
    });
    service = TestBed.inject(AuthService);
    // let afAuth = TestBed.inject(AngularFireAuth);
    // afAuth.useEmulator("http://localhost:9099");
    // firebase.storage().useEmulator("localhost", 9199);
    service.userData = testUser;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // it("should sign in", () => {
  //   service.signIn("test@gmail.com", "test123");
  //   expect(service).toBeTruthy();
  // });

  it("should get loggedin", () => {
    expect(service.isLoggedIn).toBe(false);
    localStorage.setItem("token", JSON.stringify("test123"));
    expect(service.isLoggedIn).toBe(true);
    localStorage.clear();
  });

  it("should log out", () => {
    localStorage.setItem("token", JSON.stringify("test123"));
    expect(service.isLoggedIn).toBe(true);
    localStorage.clear();
    service.signOut();
    expect(service.isLoggedIn).toBe(false);
    localStorage.clear();
  });

  it("should be delete user", () => {
    service.deleteUser();
    expect(service).toBeTruthy();
  });

  it("should be edit user", () => {
    service.editUser(testUser);
    expect(service).toBeTruthy();
  });

  it("should get user rating", () => {
    service.getUserRating();
    expect(service).toBeTruthy();
  });

  it("should upload pic", () => {
    service.uploadProfilePic("");
    expect(service).toBeTruthy();
  });

  it("should delete pic", () => {
    service.deleteProfilePic();
    expect(service).toBeTruthy();
  });

  it("should pay pending", () => {
    service.payPending();
    expect(service).toBeTruthy();
  });
});
