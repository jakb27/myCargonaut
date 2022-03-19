import {TestBed} from "@angular/core/testing";

import {CaseService} from "./case.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("CaseService", () => {
  let service: CaseService;

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

  it("should convert time", () => {
    let date = service.timeConverter({seconds: 1640118081});
    expect(date).toMatch("21 Dec 2021 21:21:21");
  });

});
