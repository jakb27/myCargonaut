import {TestBed} from "@angular/core/testing";

import {VehicleService} from "./vehicle.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe("VehicleService", () => {
  let service: VehicleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: []
    });
    service = TestBed.inject(VehicleService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

});
