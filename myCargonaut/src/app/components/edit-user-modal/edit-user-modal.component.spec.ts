import {ComponentFixture, TestBed} from "@angular/core/testing";

import {EditUserModalComponent} from "./edit-user-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("EditUserModalComponent", () => {
  let component: EditUserModalComponent;
  let fixture: ComponentFixture<EditUserModalComponent>;

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
      declarations: [EditUserModalComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    component.authService.userData = testUser;
    fixture.detectChanges();
  });

  // TODO reading displayname
  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
