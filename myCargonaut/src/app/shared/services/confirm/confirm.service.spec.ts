import { TestBed } from "@angular/core/testing";

import { ConfirmService } from "./confirm.service";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("ConfirmService", () => {
  let service: ConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    });
    service = TestBed.inject(ConfirmService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should be open modal", () => {
    service.confirmDialog();
    expect(service).toBeTruthy();
  });
});
