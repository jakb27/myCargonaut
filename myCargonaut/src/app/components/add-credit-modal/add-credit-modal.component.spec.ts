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
});
