import {ComponentFixture, TestBed} from "@angular/core/testing";

import {AddCreditModalComponent} from "./add-credit-modal.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe("AddCreditModalComponent", () => {
  let component: AddCreditModalComponent;
  let fixture: ComponentFixture<AddCreditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      declarations: [AddCreditModalComponent],
      providers: [NgbActiveModal]
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

  it("should save", async () => {
    await component.save();
    spyOn(component.confirmService, "confirmDialog").and.returnValue(Promise.resolve(true));
    expect(component).toBeTruthy();
  });

  it("should display modal title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h4");
    expect(title.innerText).toMatch("Add Funds");
  });

  // it("should display modal body", () => {
  //   let title: HTMLElement = fixture.nativeElement.querySelector("label");
  //   expect(title.innerText).toMatch("Choose an amount to add to your credits ($)");
  // });
});
