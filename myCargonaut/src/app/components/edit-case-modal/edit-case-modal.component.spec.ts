import {ComponentFixture, TestBed} from "@angular/core/testing";

import {EditCaseModalComponent} from "./edit-case-modal.component";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";

describe("EditCaseModalComponent", () => {
  let component: EditCaseModalComponent;
  let fixture: ComponentFixture<EditCaseModalComponent>;

  let testUser = {
    uid: "test123",
    firstname: "test",
    lastname: "muster",
    birthday: "01012001",
    email: "test@gmail.com",
    emailVerified: false,
    displayName: "test",
    rating: 0,
    ratings: 0,
    photoURL: "",
    credit: 0
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditCaseModalComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCaseModalComponent);
    component = fixture.componentInstance;
    component.authService.userData = testUser;
    fixture.detectChanges();
  });

  // TODO reading uid
  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
