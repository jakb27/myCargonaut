import {TestBed} from "@angular/core/testing";

import {CaseService} from "./case.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import any = jasmine.any;

describe("CaseService", () => {
  let service: CaseService;

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
      providers: [NgbActiveModal]
    });
    service = TestBed.inject(CaseService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  // it("should be create", () => {
  //   service.createCase(testCase);
  //   expect(service).toBeTruthy();
  // });

  // it("should be get", () => {
  //   service.readMyCases();
  //   expect(service).toBeTruthy();
  // });

  // it("should be update", () => {
  //   service.updateCase(testCase);
  //   expect(service).toBeTruthy();
  // });

  it("should convert time", () => {
    let date = service.timeConverter({seconds: 1640118081});
    expect(date).toMatch("21 Dec 2021 21:21:21");
  });

});
