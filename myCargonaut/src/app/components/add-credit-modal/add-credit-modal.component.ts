import { Component, OnInit } from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {CreditService} from "../../shared/services/credit/credit.service";

@Component({
  selector: "app-add-credit-modal",
  templateUrl: "./add-credit-modal.component.html",
  styleUrls: ["./add-credit-modal.component.css"]
})
export class AddCreditModalComponent implements OnInit {

  funds: number = 0;
  amount = [5, 10, 20, 50, 100, 200, 500];

  constructor(public activeModal: NgbActiveModal, public creditService: CreditService) { }

  ngOnInit(): void {
  }

  save() {
    this.creditService.addCredit(this.funds);
    this.activeModal.close();
  }

}
