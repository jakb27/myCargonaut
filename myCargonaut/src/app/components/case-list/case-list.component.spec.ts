import { ComponentFixture, TestBed } from "@angular/core/testing";

import { CaseListComponent } from "./case-list.component";
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {Vehicle} from "../../shared/models/vehicle";
import any = jasmine.any;

describe("CaseListComponent", () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;

  let testCase = {
    id: "123",
    type: "offer",
    status: "open",
    publisher_uid: "1",
    publisher_name: "test",
    accepter_uid: "2",
    seats: 1,
    capacity: 1,
    start: "mo1",
    end: "di2",
    dateTime: any,
    price: 1,
    rating: 0,
  };

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

  it("should create", () => {
    component.create();
    expect(component).toBeTruthy();
  });

  it("should accept", () => {
    component.accept(testCase);
    expect(component).toBeTruthy();
  });

  it("should display title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h2");
    expect(title.innerText).toMatch("Case List");
  });
});
