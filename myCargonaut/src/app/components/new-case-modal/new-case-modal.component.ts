import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Case} from "../../shared/models/case";
import {AuthService} from "../../shared/services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";
import {AlertService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: "app-new-offer-modal",
  templateUrl: "./new-case-modal.component.html",
  styleUrls: ["./new-case-modal.component.css"]
})
export class NewCaseModalComponent implements OnInit {

  public case!: Case;
  public type = "request";

  form = new FormGroup({
    control: new FormControl(new Date(), Validators.required)
  });

  constructor(public activeModal: NgbActiveModal, private authService: AuthService, public vehicleService: VehicleService, public alertService: AlertService) {
    this.case = {
      publisher_uid: authService.userData.uid,
      type: this.type,
      status: "open",
      start: "",
      end: "",
      dateTime: null,
      id: "",
      accepter_uid: "",
      price: 0,
      vehicle: {v_id: "", name: "", seats: 0, capacity: 0, owner_id: ""}
    };
  }

  ngOnInit(): void {
    this.vehicleService.readVehicles();
  }

  save(): void {
    if (NewCaseModalComponent.isNotEmpty(this.case.start) && NewCaseModalComponent.isNotEmpty(this.case.end)) {
      this.case.type = this.type;
      this.case.dateTime = this.form.value.control;
      this.activeModal.close(this.case);
    } else {
      this.alertService.nextAlert({type: "danger", message: "Please add Start and End"});
    }
  }

  private static isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

}
