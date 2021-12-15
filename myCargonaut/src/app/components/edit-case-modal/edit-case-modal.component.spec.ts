import {ComponentFixture, TestBed} from "@angular/core/testing";

import {EditCaseModalComponent} from "./edit-case-modal.component";

describe("EditCaseModalComponent", () => {
  let component: EditCaseModalComponent;
  let fixture: ComponentFixture<EditCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCaseModalComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
