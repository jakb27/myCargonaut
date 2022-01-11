import {Component, Input, OnInit} from "@angular/core";
import {Case} from "../../shared/models/case";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/services/auth/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";

@Component({
  selector: "app-edit-case-modal",
  templateUrl: "./edit-case-modal.component.html",
  styleUrls: ["./edit-case-modal.component.css"]
})
export class EditCaseModalComponent implements OnInit {

  @Input() c!: Case;

  public case!: Case;
  public type = "request";

  form = new FormGroup({
    control: new FormControl(new Date(), Validators.required)
  });

  constructor(public activeModal: NgbActiveModal, private authService: AuthService, public vehicleService: VehicleService) {
    this.case = {
      publisher_uid: authService.userData.uid,
      publisher_name: authService.userData.displayName,
      type: "",
      status: "open",
      start: "",
      end: "",
      seats:0,
      capacity:0,
      dateTime: null,
      id: "",
      accepter_uid: "",
      price: 0,
      rating: 0,
      vehicle: {v_id: "", name: "", seats: 0, capacity: 0, owner_id: ""}
    };
  }

  ngOnInit(): void {
    this.vehicleService.readVehicles();
    this.case = this.c; //TODO request/offer + date + vehicle (name) wird nicht übernommen
  }

  save(): void {
    if (EditCaseModalComponent.isNotEmpty(this.case.start) && EditCaseModalComponent.isNotEmpty(this.case.end)) {
      this.case.type = this.type;
      this.case.dateTime = this.form.value.control;
      console.log(this.case);
      this.activeModal.close(this.case);
    }
  }

  private static isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

  setCapacity(): void {
    if(this.case.vehicle != undefined) {
      this.case.seats = this.case.vehicle.seats;
      this.case.capacity = this.case.vehicle.capacity;
    }
  }

}
