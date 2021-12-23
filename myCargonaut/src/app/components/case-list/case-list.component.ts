import {Component, OnInit} from "@angular/core";
import {Case} from "../../shared/models/case";
import {CaseService} from "../../shared/services/case.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";
import {AuthService} from "../../shared/services/auth.service";
import {VehicleService} from "../../shared/services/vehicle.service";
import {AlertService} from "../../shared/services/alerts.service";
import {Alert} from "../../shared/models/alert";

@Component({
  selector: "app-case-list",
  templateUrl: "./case-list.component.html",
  styleUrls: ["./case-list.component.css"]
})
export class CaseListComponent implements OnInit {

  showOwn: boolean = true;
  type_offer: string = "offer";

  constructor(public caseService: CaseService, public modalService: NgbModal, public authService: AuthService, public vehicleService: VehicleService, public alertService: AlertService) {
  }

  ngOnInit(): void {
    this.caseService.readCasesDashboard();
  }

  public async create() {
    if (this.vehicleService.vehicles != undefined && this.vehicleService.vehicles.length > 0) {
      const modalReference = this.modalService.open(NewCaseModalComponent);
      try {
        const resultCase: Case = await modalReference.result;
        await this.caseService.createCase(resultCase);
      } catch (error) {
      }
    } else {
      this.alertService.nextAlert({type: "danger", message: "Please add Vehicle first"});
    }
  }

  public async accept(c: Case) {
    c.accepter_uid = this.authService.userData.uid;
    c.status = "booked";
    await this.caseService.updateCase(c);
  }

  public toggleShowOwn() {
    this.showOwn = !this.showOwn;
  }


}
