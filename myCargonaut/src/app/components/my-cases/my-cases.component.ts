import {Component, OnInit} from "@angular/core";
import {CaseService} from "../../shared/services/case/case.service";
import {Case} from "../../shared/models/case";
import {AuthService} from "../../shared/services/auth/auth.service";
import {onSnapshot} from "@angular/fire/firestore";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {EditCaseModalComponent} from "../edit-case-modal/edit-case-modal.component";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";
import {AlertService} from "../../shared/services/alerts/alerts.service";
import {CreditService} from "../../shared/services/credit/credit.service";
import {RatingModalComponent} from "../rating-modal/rating-modal.component";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {Router} from "@angular/router";

@Component({
  selector: "app-my-cases",
  templateUrl: "./my-cases.component.html",
  styleUrls: ["./my-cases.component.css"]
})
export class MyCasesComponent implements OnInit {

  public list: string = "published"; // "booked"
  public type_offer: string = "offer";

  constructor(public caseService: CaseService,
              public authService: AuthService,
              public modalService: NgbModal,
              public vehicleService: VehicleService,
              public alertService: AlertService,
              public creditService: CreditService,
              public confirmService: ConfirmService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.vehicleService.readVehicles();
    this.caseService.readMyCases();
  }

  public async create() {
    // if (this.vehicleService.vehicles != undefined && this.vehicleService.vehicles.length > 0) {
      const modalReference = this.modalService.open(NewCaseModalComponent);
      try {
        const resultCase: Case = await modalReference.result;
        this.confirmService.confirmDialog().then(async (res) => {
          if (res) {
            await this.caseService.createCase(resultCase).then(
              () => this.alertService.nextAlert({type: "success", message: "Case successful added"})
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

  // TODO confirm?
  public async edit(c: Case) {
    const modalReference = this.modalService.open(EditCaseModalComponent);
    modalReference.componentInstance.c = c;

    try {
      const resultCase: Case = await modalReference.result;
      // console.log(resultCase.dateTime);
      this.confirmService.confirmDialog().then(async res => {
        if (res) {
          await this.caseService.updateCase(resultCase).then(
            () => this.alertService.nextAlert({type: "success", message: "Case successful edited"})
          );
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(c: Case) {
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.caseService.deleteCase(c).then(
          () => this.alertService.nextAlert({type: "success", message: "Case successfully deleted"})
        );
      } else {
        this.alertService.nextAlert({type: "warning", message: "Deleting case cancelled"});
      }
    });
  }

  public async cancel(c: Case) {
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.creditService.unacceptFee(c).then( async res => {
          if (res) {
            c.accepter_uid = "";
            c.status = "open";
            await this.caseService.updateCase(c).then(
              () => this.alertService.nextAlert({type: "warning", message: "Case successfully canceled with 50% fee"}) // TODO
            );
          } else {
            this.alertService.nextAlert({type: "danger", message: "Please add funds in your profile to pay case"});
            // this.router.navigate(["user-profile"]);
          }
        });
      } else {
        this.alertService.nextAlert({type: "warning", message: "Cancelling case cancelled"});
      }
    });
  }

  public async finish(c: Case) {
    const modalReference = this.modalService.open(RatingModalComponent);
    modalReference.componentInstance.c = c;

    try {
      const resultCase: Case = await modalReference.result;
      this.confirmService.confirmDialog().then(async res => {
        if (res) {
          await this.creditService.finishPay(c).then( async res => {
            if (res) {
              resultCase.status = "finished";
              await this.caseService.updateCase(resultCase).then(
                () => this.alertService.nextAlert({type: "success", message: "Case successfully rated and payed"}) // TODO
              );
            } else {
              this.alertService.nextAlert({type: "danger", message: "Please add funds in your profile to pay case"});
              // this.router.navigate(["user-profile"]);
            }
          });
        } else {
          this.alertService.nextAlert({type: "warning", message: "Case not finished"});
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  public selectCases() {
    if (this.list === "published") return this.caseService.myCasesP;
    if (this.list === "booked") return this.caseService.myCasesA;
    if (this.list === "finished") return this.caseService.myCasesF;
    return null;
  }

}
