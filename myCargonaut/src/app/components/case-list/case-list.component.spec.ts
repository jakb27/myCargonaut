import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CaseListComponent } from "./case-list.component";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe("CaseListComponent", () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      declarations: [ CaseListComponent ],
      // providers:[{provide: AngularFireDatabase, useValue: mockDB}] TODO
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should toggle own", () => {
    let toggle = component.showOwn;
    component.toggleShowOwn();
    expect(component.showOwn).toBe(!toggle);
  });
});
