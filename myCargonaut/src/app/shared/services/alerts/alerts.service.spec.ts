import {TestBed} from "@angular/core/testing";

import {AlertService} from "./alerts.service";

describe("AlertService", () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  // it("should be created", () => {
  //   expect(service).toBeTruthy();
  // });
});
