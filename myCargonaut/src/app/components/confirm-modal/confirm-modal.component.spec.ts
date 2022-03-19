import {ComponentFixture, TestBed} from "@angular/core/testing";

import {ConfirmModalComponent} from "./confirm-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("ConfirmModalComponent", () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      declarations: [ConfirmModalComponent],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should confirm", () => {
    component.confirm();
    expect(component).toBeTruthy();
  });

  it("should decline", () => {
    component.decline();
    expect(component).toBeTruthy();
  });

  it("should display modal title", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("h4");
    expect(title.innerText).toMatch("Confirmation");
  });

  it("should display modal body", () => {
    let title: HTMLElement = fixture.nativeElement.querySelector("p");
    expect(title.innerText).toMatch("Are you sure?");
  });
});
