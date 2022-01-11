import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {Case} from "../../models/case";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root"
})
export class CreditService {

  constructor(public authService: AuthService, public afs: AngularFirestore,) {
  }

  async addCredit(funds: number) {
    if (this.authService.afAuth.currentUser != null) {
      this.authService.userData.credit += funds;
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
    }
  }

  async unacceptFee(c: Case) {
    if (this.authService.afAuth.currentUser != null) {
      this.authService.userData.credit -= c.price * 0.5;
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
    }
  }

  async finishPay(c: Case) {
    if (this.authService.afAuth.currentUser != null && this.authService.userData.credit > c.price) {
      this.authService.userData.credit -= c.price; //TODO neuer credit sonst nur bei reload sichtbar
      // await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit-c.price);
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
      return true;
      // TODO add money to publisher (firestore rules?? cant access publisher credit!!)
      // let p = await this.afs.firestore.collection("/users").doc(c.publisher_uid).get();
      // console.log(p);
      // await this.updateCredit(c.publisher_uid, p.data()!["credit"] + c.price);
    } else {
      return false;
    }
  }

  //TODO transaction
  async updateCredit(uid: any, credit: number) {
    await this.afs.collection("/users").doc(uid).update({
      credit: credit
    });
  }
}
