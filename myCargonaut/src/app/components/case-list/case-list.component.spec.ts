import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListComponent } from './case-list.component';
import {AngularFireDatabase} from "@angular/fire/compat/database";

describe('OffersListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseListComponent ],
      // providers:[{provide: AngularFireDatabase, useValue: mockDB}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
