import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SignUpComponent } from "./sign-up.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {By} from "@angular/platform-browser";

describe("SignUpComponent", () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h3");
    expect(title.innerText).toMatch("Sign Up");
  });

  it("should display link", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("a");
    expect(title.innerText).toMatch("Log In?");
  });

  it("should call submit button", async () => {
    spyOn(component.authService, "signUp");
    let btn = fixture.debugElement.query(By.css("input"));
    btn.triggerEventHandler("click", null);
    fixture.whenStable().then(() => {
      expect(component.authService.signUp("", "", "", "", "")).toHaveBeenCalled();
    });
  });
});
