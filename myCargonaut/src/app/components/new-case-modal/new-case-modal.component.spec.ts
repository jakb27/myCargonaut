import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCaseModalComponent } from './new-case-modal.component';

describe('NewOfferModalComponent', () => {
  let component: NewCaseModalComponent;
  let fixture: ComponentFixture<NewCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
