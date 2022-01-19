import {Component, OnInit} from "@angular/core";
import {Case} from "../../shared/models/case";
import {CaseService} from "../../shared/services/case/case.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";
import {AuthService} from "../../shared/services/auth/auth.service";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";
import {AlertService} from "../../shared/services/alerts/alerts.service";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";

@Component({
  selector: "app-case-list",
  templateUrl: "./case-list.component.html",
  styleUrls: ["./case-list.component.css"]
})
export class CaseListComponent implements OnInit {

  showOwn: boolean = true;
  type_offer: string = "offer";

  constructor(public caseService: CaseService,
              public modalService: NgbModal,
              public authService: AuthService,
              public vehicleService: VehicleService,
              public alertService: AlertService,
              public confirmService: ConfirmService,
              public notificationService: AlertService) {
  }

  ngOnInit(): void {
    this.caseService.readCasesDashboard();
    this.vehicleService.readVehicles();
  }

  public async create() {
    // if (this.vehicleService.vehicles != undefined && this.vehicleService.vehicles.length > 0) {
    const modalReference = this.modalService.open(NewCaseModalComponent);
    try {
      const resultCase: Case = await modalReference.result;
      this.confirmService.confirmDialog().then(async (res) => {
        if (res) {
          await this.caseService.createCase(resultCase).then(
            () => {
              this.alertService.nextAlert({type: "success", message: "Case successfully added"});
              //this.notificationService.onSuccess("Case successfully added");
            }
          );
        } else {
          this.alertService.nextAlert({type: "warning", message: "Adding case cancelled"});
        }
      });
    } catch (error) {
    }
    // } else {
    //   this.alertService.nextAlert({type: "danger", message: "Please add Vehicle first"});
    // }
  }

  public async accept(c: Case) {
    this.confirmService.confirmDialog().then(async (res) => {
      if (res) {
        if (this.authService.userData.credit >= c.price) {
          c.accepter_uid = this.authService.userData.uid;
          c.status = "booked";
          await this.caseService.updateCase(c).then(() => {
            this.alertService.nextAlert({type: "success", message: "Successfully booked"});
          });
        } else {
          this.alertService.nextAlert({type: "danger", message: "Please add funds in your profile to book case"});
        }

      } else {
        this.alertService.nextAlert({type: "warning", message: "Booking cancelled"});
      }
    });

  }

  public toggleShowOwn() {
    this.showOwn = !this.showOwn;
  }


}
