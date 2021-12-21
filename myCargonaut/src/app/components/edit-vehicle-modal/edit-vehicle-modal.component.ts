import {Component, Input, OnInit} from "@angular/core";
import {Vehicle} from "../../shared/models/vehicle";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: "app-edit-vehicle-modal",
  templateUrl: "./edit-vehicle-modal.component.html",
  styleUrls: ["./edit-vehicle-modal.component.css"]
})
export class EditVehicleModalComponent implements OnInit {

  @Input() v!: Vehicle;

  public vehicle!: Vehicle;

  constructor(public activeModal: NgbActiveModal) {
    this.vehicle = {name: "", owner_id: "", v_id: "", capacity: 0, seats: 0};
  }

  ngOnInit(): void {
    this.vehicle = this.v;
  }

  save(): void {
    if (EditVehicleModalComponent.isNotEmpty(this.vehicle.name)) {
      this.activeModal.close(this.vehicle);
    }
  }

  private static isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

}
