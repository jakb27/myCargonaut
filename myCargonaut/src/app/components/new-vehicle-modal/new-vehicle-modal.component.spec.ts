import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewVehicleModalComponent } from "./new-vehicle-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("NewVehicleModalComponent", () => {
  let component: NewVehicleModalComponent;
  let fixture: ComponentFixture<NewVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVehicleModalComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it("should create", () => {
  //  expect(component).toBeTruthy();
  //});
});
