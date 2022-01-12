import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewVehicleModalComponent } from "./new-vehicle-modal.component";

describe("NewVehicleModalComponent", () => {
  let component: NewVehicleModalComponent;
  let fixture: ComponentFixture<NewVehicleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewVehicleModalComponent ]
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
