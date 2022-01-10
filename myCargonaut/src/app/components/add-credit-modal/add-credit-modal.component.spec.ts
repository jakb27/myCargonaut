import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AddCreditModalComponent} from "./add-credit-modal.component";

describe("AddCreditModalComponent", () => {
  let component: AddCreditModalComponent;
  let fixture: ComponentFixture<AddCreditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddCreditModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
