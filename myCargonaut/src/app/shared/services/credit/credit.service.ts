import { Injectable } from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Case} from "../../models/case";

@Injectable({
  providedIn: "root"
})
export class CreditService {

  constructor(public authService: AuthService) { }

  async addCredit() {
    if(this.authService.afAuth.currentUser != null){
      this.authService.userData.credit += 10;
      await this.authService.updateCredit();
    }
  }

  async unacceptFee(c: Case) {
    if(this.authService.afAuth.currentUser != null){
      this.authService.userData.credit -= c.price * 0.5;
      await this.authService.updateCredit();
    }
  }

  async finishPay(c: Case) {
    if(this.authService.afAuth.currentUser != null){
      this.authService.userData.credit -= c.price;
      await this.authService.updateCredit();
    }
  }
}
