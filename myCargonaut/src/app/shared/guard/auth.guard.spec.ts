import { TestBed } from "@angular/core/testing";

import { AuthGuard } from "./auth.guard";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe("AuthGuard", () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });

  // it("should be activate", () => {
  //   guard.authService.signIn("test", "test");
  //   expect(guard.authService.isLoggedIn).toBe(true);
  //   expect(guard).toBeTruthy();
  // });
});
