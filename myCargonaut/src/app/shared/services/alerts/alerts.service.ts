import { Injectable } from "@angular/core";
import {Alert} from "../../models/alert";
import {Subject} from "rxjs";
import {NotificationsService} from "angular2-notifications";

@Injectable({
  providedIn: "root"
})
export class AlertService {

  private _alert: Subject<Alert> = new Subject<Alert>();

  //constructor(private service: NotificationsService) { }
  constructor() {
  }

  nextAlert(a: Alert) {
    this._alert.next(a);
  }

  get alert(): Subject<Alert> {
    return this._alert;
  }


  // onSuccess(message: string) {
  //   this.service.success("Success", message, {
  //     position: ["top", "center"],
  //     timeOut: 2000,
  //     animate: "fade",
  //     showProgressBar: true
  //   });
  // }
  //
  // onError(message: string) {
  //   this.service.error("Error", message, {
  //     position: ["top", "center"],
  //     timeOut: 2000,
  //     animate: "fade",
  //     showProgressBar: true
  //   });
  // }
  //
  // onCancel(message: string) {
  //   this.service.info("Cancelled", message, {
  //     position: ["top", "center"],
  //     timeOut: 2000,
  //     animate: "fade",
  //     showProgressBar: true
  //   });
  // }
}
