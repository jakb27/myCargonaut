import { TestBed } from "@angular/core/testing";

import { CreditService } from "./credit.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("CreditService", () => {
  let service: CreditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: []
    });
    service = TestBed.inject(CreditService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
