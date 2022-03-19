import {TestBed} from "@angular/core/testing";

import {AuthService} from "./auth.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {RouterTestingModule} from "@angular/router/testing";
import firebase from "firebase/compat";

describe("AuthService", () => {
  let service: AuthService;

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
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // it("should sign in", () => {
  //   service.signIn("test@gmail.com", "test123");
  //   expect(service).toBeTruthy();
  // });
});
