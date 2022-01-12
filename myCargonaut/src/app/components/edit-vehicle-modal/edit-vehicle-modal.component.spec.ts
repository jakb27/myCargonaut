import { ComponentFixture, TestBed } from "@angular/core/testing";

import { EditVehicleModalComponent } from "./edit-vehicle-modal.component";

describe("EditVehicleModalComponent", () => {
  let component: EditVehicleModalComponent;
  let fixture: ComponentFixture<EditVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVehicleModalComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditVehicleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  //it("should create", () => {
  //  expect(component).toBeTruthy();
  //});
});
