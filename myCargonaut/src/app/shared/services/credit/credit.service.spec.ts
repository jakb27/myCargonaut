import { TestBed } from "@angular/core/testing";

import { CreditService } from "./credit.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import any = jasmine.any;

describe("CreditService", () => {
  let service: CreditService;

  let testCase = {
    id: "123",
    type: "offer",
    status: "open",
    publisher_uid: "1",
    publisher_name: "test",
    accepter_uid: "2",
    seats: 1,
    capacity: 1,
    start: "mo1",
    end: "di2",
    dateTime: any,
    price: 1,
    rating: 0,
  };

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

  // it("should be add", async () => {
  //   await service.addCredit(10);
  //   expect(service).toBeTruthy();
  // });
  //
  // it("should be unaccept", async () => {
  //   await service.unacceptFee(testCase);
  //   expect(service).toBeTruthy();
  // });
});
