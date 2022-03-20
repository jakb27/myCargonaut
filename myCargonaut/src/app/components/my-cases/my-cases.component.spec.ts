import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MyCasesComponent } from "./my-cases.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import any = jasmine.any;

describe("MyCasesComponent", () => {
  let component: MyCasesComponent;
  let fixture: ComponentFixture<MyCasesComponent>;

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
      declarations: [ MyCasesComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // it("should create", () => {
  //   component.create();
  //   expect(component).toBeTruthy();
  // });

  // it("should edit", () => {
  //   component.edit(testCase);
  //   expect(component).toBeTruthy();
  // });

  it("should delete", () => {
    component.delete(testCase);
    expect(component).toBeTruthy();
  });

  it("should cancel", () => {
    component.cancel(testCase);
    expect(component).toBeTruthy();
  });

  it("should finish", () => {
    component.finish(testCase);
    expect(component).toBeTruthy();
  });

  it("should display title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h2");
    expect(title.innerText).toMatch("My Case List");
  });

  it("should select cases", () => {
    component.list = "published";
    expect(component.selectCases()).toEqual(component.caseService.myCasesA);
    component.list = "booked";
    expect(component.selectCases()).toEqual(component.caseService.myCasesP);
    component.list = "finished";
    expect(component.selectCases()).toEqual(component.caseService.myCasesF);
  });
});
