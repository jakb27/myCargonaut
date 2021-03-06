import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/services/auth/auth.service";
import {Vehicle, VehicleType} from "../../shared/models/vehicle";
import {AlertService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: "app-new-vehicle-modal",
  templateUrl: "./new-vehicle-modal.component.html",
  styleUrls: ["./new-vehicle-modal.component.css"]
})
export class NewVehicleModalComponent implements OnInit {

  public vehicle!: Vehicle;
  public vehicleTypes = VehicleType;

  constructor(public activeModal: NgbActiveModal,
              private authService: AuthService,
              public alertService: AlertService) {
    this.vehicle = {v_id: "", owner_id: "", name: "", seats: 0, capacity: 0, type: undefined};
  }

  ngOnInit(): void {
    this.vehicle.owner_id = this.authService.userData.uid;
  }

  save(): void {
    if (NewVehicleModalComponent.isNotEmpty(this.vehicle.name) && NewVehicleModalComponent.isNotEmpty(this.vehicle.type)) {
      this.activeModal.close(this.vehicle);
    } else {
      this.alertService.nextAlert({type: "danger", message: "Please add Vehicle Name and/or Type"});
    }
  }

  private static isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

}
