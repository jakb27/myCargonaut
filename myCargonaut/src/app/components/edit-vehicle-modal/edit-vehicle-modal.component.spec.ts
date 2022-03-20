import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditVehicleModalComponent } from "./edit-vehicle-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("EditVehicleModalComponent", () => {
  let component: EditVehicleModalComponent;
  let fixture: ComponentFixture<EditVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicleModalComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO
  //it("should create", () => {
  //  expect(component).toBeTruthy();
  //});
});
