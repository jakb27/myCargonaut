import { ComponentFixture, TestBed } from "@angular/core/testing";

import { NewCaseModalComponent } from "./new-case-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("NewCaseModalComponent", () => {
  let component: NewCaseModalComponent;
  let fixture: ComponentFixture<NewCaseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewCaseModalComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCaseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
