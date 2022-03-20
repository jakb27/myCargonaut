import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SignInComponent } from "./sign-in.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {By} from "@angular/platform-browser";

describe("SignInComponent", () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should display title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h3");
    expect(title.innerText).toMatch("Sign In");
  });

  it("should display link", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("a");
    expect(title.innerText).toMatch("Forgot Password?");
  });

  it("should call submit button", async () => {
    spyOn(component.authService, "signIn");
    let btn = fixture.debugElement.query(By.css("input"));
    btn.triggerEventHandler("click", null);
    fixture.whenStable().then(() => {
      expect(component.authService.signIn("", "")).toHaveBeenCalled();
    });
  });
});
