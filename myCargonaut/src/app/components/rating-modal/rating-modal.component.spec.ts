import { ComponentFixture, TestBed } from "@angular/core/testing";

import { RatingModalComponent } from "./rating-modal.component";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../../../environments/environment";
import {RouterTestingModule} from "@angular/router/testing";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

describe("RatingModalComponent", () => {
  let component: RatingModalComponent;
  let fixture: ComponentFixture<RatingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RatingModalComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule
      ],
      providers: [NgbActiveModal]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RatingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // TODO undefined uid (auth?)
  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
