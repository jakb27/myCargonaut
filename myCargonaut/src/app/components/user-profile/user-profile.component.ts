import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../shared/models/vehicle";
import {VehicleService} from "../../shared/services/vehicle.service";
import {NewVehicleModalComponent} from "../new-vehicle-modal/new-vehicle-modal.component";
import {onSnapshot} from "@angular/fire/firestore";
import {EditVehicleModalComponent} from "../edit-vehicle-modal/edit-vehicle-modal.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {

  vehicles: Vehicle[] = [];

  constructor(public authService: AuthService, public modalService: NgbModal, public vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    if (this.authService.userData) {
      const q = this.vehicleService.readVehicles();

      onSnapshot(q, (querySnapshot) => {
        this.vehicles = [];
        querySnapshot.forEach((doc) => {
          this.vehicles.push(doc.data() as Vehicle);
        });
      });
    }
  }

  public async create() {
    const modalReference = this.modalService.open(NewVehicleModalComponent);
    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.createVehicle(resultVehicle);
    } catch (error) {
    }
  }

  public async edit(v: Vehicle) {
    const modalReference = this.modalService.open(EditVehicleModalComponent);
    modalReference.componentInstance.v = v;

    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.updateVehicle(resultVehicle);
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(v: Vehicle) {
    await this.vehicleService.deleteVehicle(v);
  }
}
