import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
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
import {AddCreditModalComponent} from "../add-credit-modal/add-credit-modal.component";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"]
})
export class UserProfileComponent implements OnInit {

  user!: User;
  file!: any;

  constructor(public authService: AuthService,
              public modalService: NgbModal,
              public vehicleService: VehicleService,
              public alertService: AlertService,
              public creditService: CreditService,
              public confirmService: ConfirmService) {
  }

  @ViewChild("fileInput")
    inputVar!: ElementRef;

  ngOnInit(): void {
    this.init().then(() => {
      this.user = this.authService.userData;
    });
  }

  ngAfterView() {
  }

  async init() {
    return new Promise<void>(async (resolve) => {
      await this.authService.getUserData();
      await this.vehicleService.readVehicles();
      await this.authService.getUserRating();
      resolve();
    });
  }

  public async upload(event: any) {
    this.file = event.target.files[0];
  }

  public async uploadProfilePic() {
    console.log(this.file);
    if (this.file != undefined) {
      this.confirmService.confirmDialog().then(async res => {
        if (res) {
          await this.authService.uploadProfilePic(this.file).then(
            () => this.alertService.nextAlert({type: "success", message: "Profile Picture successfully added"})
          );
        } else {
          this.alertService.nextAlert({type: "warning", message: "Adding profile picture cancelled"});
        }
        this.inputVar.nativeElement.value = "";
        this.file = null;
      });
    } else {
      this.alertService.nextAlert({type: "danger", message: "Please choose file to upload"});
      this.inputVar.nativeElement.value = "";
      this.file = null;
    }

  }

  public async deleteProfilePic() {
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.authService.deleteProfilePic().then(
          () => this.alertService.nextAlert({type: "success", message: "Profile Picture successfully deleted"})
        );
      } else {
        this.alertService.nextAlert({type: "warning", message: "Deleting profile picture cancelled"});
      }
    });
  }

  public async addCredits() {
    const modalReference = this.modalService.open(AddCreditModalComponent);
    try {
      const resultVehicle: Vehicle = await modalReference.result;
      await this.vehicleService.createVehicle(resultVehicle).then(
        () => this.alertService.nextAlert({type: "success", message: "Vehicle successfully added"})
      );
    } catch (error) {
      console.log(error);
    }
  }

  public async createVehicle() {
    const modalReference = this.modalService.open(NewVehicleModalComponent);
    try {
      const resultVehicle: Vehicle = await modalReference.result;
      this.confirmService.confirmDialog().then(async res => {
        if (res) {
          await this.vehicleService.createVehicle(resultVehicle).then(
            () => this.alertService.nextAlert({type: "success", message: "Vehicle successful added"})
          );
        } else {
          this.alertService.nextAlert({type: "warning", message: "Adding vehicle cancelled"});
        }
      });

    } catch (error) {
      console.log(error);
    }
  }

  // TODO confirm?
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

  public async deleteVehicle(v: Vehicle) {
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.vehicleService.deleteVehicle(v).then(
          () => this.alertService.nextAlert({type: "success", message: "Vehicle successfully deleted"})
        );
      } else {
        this.alertService.nextAlert({type: "warning", message: "Deleting vehicle cancelled"});
      }
    });
  }

  // TODO editUser mail/pw
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

  public async deleteUser() {
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.authService.deleteUser();
      }
    });
  }


}
