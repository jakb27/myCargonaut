import {TestBed} from "@angular/core/testing";

import {AlertService} from "./alerts.service";
import {Subject} from "rxjs";

describe("AlertService", () => {
  let service: AlertService;

  let testAlarm = {
    type: "test",
    message: "test"
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be next", () => {
    expect(service.alert).toBeTruthy();
    service.nextAlert(testAlarm);
    expect(service.alert).toBeTruthy();
  });

  it("should get alert", () => {
    expect(service.alert).toBeTruthy();
  });
});
