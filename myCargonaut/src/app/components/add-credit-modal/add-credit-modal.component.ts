import {Component, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CreditService} from "../../shared/services/credit/credit.service";
import {ConfirmService} from "../../shared/services/confirm/confirm.service";
import {AlertService} from "../../shared/services/alerts/alerts.service";

@Component({
  selector: "app-add-credit-modal",
  templateUrl: "./add-credit-modal.component.html",
  styleUrls: ["./add-credit-modal.component.css"]
})
export class AddCreditModalComponent implements OnInit {

  funds: number = 0;
  amount = [5, 10, 20, 50, 100, 200, 500];

  constructor(public activeModal: NgbActiveModal,
              public creditService: CreditService,
              public confirmService: ConfirmService,
              public alertService: AlertService) {
  }

  ngOnInit(): void {
  }

  save() {
    this.activeModal.close();
    this.confirmService.confirmDialog().then(async res => {
      if (res) {
        await this.creditService.addCredit(this.funds).then(
          () => this.alertService.nextAlert({type: "success", message: "Funds successfully added"})
        );
      } else {
        this.alertService.nextAlert({type: "warning", message: "Adding Funds cancelled"});
      }
    });
  }

}
