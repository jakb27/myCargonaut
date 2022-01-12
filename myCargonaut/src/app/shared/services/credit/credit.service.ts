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

  async addCredit(funds: number): Promise<void> {
    if (this.authService.afAuth.currentUser != null) {
      this.authService.userData.credit += funds;
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
    }
  }

  async unacceptFee(c: Case): Promise<boolean> {
    let fee = 0.5;
    if (this.authService.afAuth.currentUser != null && this.authService.userData.credit >= c.price * fee) {
      this.authService.userData.credit -= c.price * fee;
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
      return true;
    } else {
      return false;
    }
  }

  async finishPay(c: Case): Promise<boolean> {
    if (this.authService.afAuth.currentUser != null && this.authService.userData.credit >= c.price) {
      this.authService.userData.credit -= c.price; //TODO neuer credit sonst nur bei reload sichtbar
      // await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit-c.price);
      await this.updateCredit(this.authService.userData.uid, this.authService.userData.credit);
      await this.payPublisher(c.publisher_uid, c.accepter_uid, c.price);
      return true;
    } else {
      return false;
    }
  }

  //TODO transaction
  async updateCredit(uid: any, credit: number): Promise<void> {
    await this.afs.collection("/users").doc(uid).update({
      credit: credit
    });
  }

  async payPublisher(p_uid: string, a_uid: string, price: number){
    let publisherPending = await this.afs.firestore.collection("pendingCredits").doc(p_uid).get();
    let newPending = publisherPending.data()!["pending"] + price;
    await this.afs.collection("/pendingCredits").doc(p_uid).update({
      pending: newPending
    });
  }

}
