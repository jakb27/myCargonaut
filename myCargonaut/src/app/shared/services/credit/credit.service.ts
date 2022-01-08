import { Injectable } from "@angular/core";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class CreditService {

  constructor(public authService: AuthService) { }

  async addCredit() {
    if(this.authService.afAuth.currentUser != null){
      this.authService.userData.credit += 10;
      this.authService.updateCredit();
    }
  }
}
