import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Vehicle} from "../../shared/models/vehicle";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";
import {NewVehicleModalComponent} from "../new-vehicle-modal/new-vehicle-modal.component";
import {EditVehicleModalComponent} from "../edit-vehicle-modal/edit-vehicle-modal.component";
import {AlertService} from "../../shared/services/alerts/alerts.service";
import {User} from "../../shared/models/user";
import {CreditService} from "../../shared/services/credit/credit.service";
import {EditUserModalComponent} from "../edit-user-modal/edit-user-modal.component";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {

  user!: User;

  constructor(public authService: AuthService, public modalService: NgbModal, public vehicleService: VehicleService,
              public alertService: AlertService, public creditService: CreditService) {
  }

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.vehicleService.readVehicles();
  }

  public async uploadProfilePic() {

  }

  public async deleteProfilePic() {

  }

  public async create() {
    const modalReference = this.modalService.open(NewVehicleModalComponent);
    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.createVehicle(resultVehicle).then(
        () => this.alertService.nextAlert({type: "success", message: "Vehicle successful added"})
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async editVehicle(v: Vehicle) {
    const modalReference = this.modalService.open(EditVehicleModalComponent);
    modalReference.componentInstance.v = v;

    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.updateVehicle(resultVehicle).then(
        () => this.alertService.nextAlert({type: "success", message: "Vehicle successfully edited"})
      );
    } catch (error) {
      console.log(error);
    }
  }

  // TODO editUser
  public async editUser() {
    const modalReference = this.modalService.open(EditUserModalComponent);
    modalReference.componentInstance.u = this.authService.userData;

    try {
      const resultUser: User = await modalReference.result;
      await this.authService.editUser(resultUser).then(
        () => this.alertService.nextAlert({type: "success", message: "User successfully edited"})
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(v: Vehicle) {
    await this.vehicleService.deleteVehicle(v).then(
      () => this.alertService.nextAlert({type: "success", message: "Vehicle successfully deleted"})
    );
  }
}
