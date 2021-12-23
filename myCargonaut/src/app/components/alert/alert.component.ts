import {Component, OnInit, ViewChild} from "@angular/core";
import {debounceTime} from "rxjs/operators";
import {NgbAlert} from "@ng-bootstrap/ng-bootstrap";
import {AlertService} from "../../shared/services/alerts.service";
import {Alert} from "../../shared/models/alert";

@Component({
  selector: "app-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.css"]
})
export class AlertComponent implements OnInit {

  constructor(public alertService: AlertService) {
  }

  alert?: Alert;

  @ViewChild("selfClosingAlert", {static: false}) selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    this.alertService.alert.subscribe(message => this.alert = message);
    this.alertService.alert.pipe(debounceTime(2000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }
}
