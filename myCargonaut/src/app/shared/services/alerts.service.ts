import { Injectable } from "@angular/core";
import {Alert} from "../models/alert";
import {Subject} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class AlertService {

  private _alert: Subject<Alert> = new Subject<Alert>();

  constructor() { }

  nextAlert(a: Alert) {
    this._alert.next(a);
  }

  get alert(): Subject<Alert> {
    return this._alert;
  }
}
