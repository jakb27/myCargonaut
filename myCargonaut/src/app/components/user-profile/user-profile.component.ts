import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../shared/models/vehicle";
import {VehicleService} from "../../shared/services/vehicle.service";
import {NewVehicleModalComponent} from "../new-vehicle-modal/new-vehicle-modal.component";
import {onSnapshot} from "@angular/fire/firestore";

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
    const q = this.vehicleService.readVehicles();

    onSnapshot(q, (querySnapshot) => {
      this.vehicles = [];
      querySnapshot.forEach((doc) => {
        this.vehicles.push(doc.data() as Vehicle);
      });
    });


  }

  public async create() {
    console.log(this.authService.userData.uid);
    const modalReference = this.modalService.open(NewVehicleModalComponent);
    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.createVehicle(resultVehicle);
    } catch (error) {
    }
  }
}
