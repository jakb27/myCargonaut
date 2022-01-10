import {Injectable} from "@angular/core";
import {Case} from "../../models/case";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, onSnapshot, query, where} from "@angular/fire/firestore";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class CaseService {

  private _casesDashboard: Case[] = [];
  private _myCasesP: Case[] = [];
  private _myCasesA: Case[] = [];
  private _myCasesF: Case[] = [];

  constructor(private fs: AngularFirestore, private authService: AuthService) {
  }

  createCase(c: Case) {
    c.id = this.fs.createId();
    return this.fs.collection("cases").doc(c.id).set(c);
  }

  readCasesDashboard() {
    const q = query(collection(this.fs.firestore, "cases"), where("accepter_uid", "==", ""));

    onSnapshot(q, (querySnapshot) => {
      this._casesDashboard = [];
      querySnapshot.forEach((doc) => {
        this._casesDashboard.push(doc.data() as Case);
      });
    });
  }

  readMyCases() {
    if(this.authService.userData) {
      const queryPublished = query(collection(this.fs.firestore, "cases"),
        where("publisher_uid", "==", this.authService.userData.uid),
        where("status", "!=", "finished"));
      const queryAccepted = query(collection(this.fs.firestore, "cases"),
        where("accepter_uid", "==", this.authService.userData.uid),
        where("status", "!=", "finished"));
      const queryFinished = query(collection(this.fs.firestore, "cases"),
        where("status", "==", "finished"));

      onSnapshot(queryPublished, (querySnapshot) => {
        this._myCasesP = [];
        querySnapshot.forEach((doc) => {
          this.myCasesP.push(doc.data() as Case);
        });
      });
      onSnapshot(queryAccepted, (querySnapshot) => {
        this._myCasesA = [];
        querySnapshot.forEach((doc) => {
          this.myCasesA.push(doc.data() as Case);
        });
      });
      onSnapshot(queryFinished, (querySnapshot) => {
        this._myCasesF = [];
        querySnapshot.forEach((doc) => {
          this.myCasesF.push(doc.data() as Case);
        });
      });
    }

    //TODO 2 queries as 1 with where(uid in published/accepted) ?

    // const q = this.caseService.readCasesByID(this.authService.userData.uid);
    // onSnapshot(q, (querySnapshot) => {
    //   this.myCasesP = [];
    //   this.myCasesA = [];
    //   querySnapshot.forEach((doc) => {
    //     let d = doc.data() as Case;
    //     if(d.accepter_uid != "") {
    //       this.myCasesA.push(d);
    //     } else {
    //       this.myCasesP.push(d);
    //     }
    //   });
    // });
  }

  updateCase(c: Case) {
    return this.fs.doc("cases/" + c.id).update(c);
  }

  deleteCase(c: Case) {
    return this.fs.doc("cases/" + c.id).delete();
  }

  get casesDashboard(): Case[] {
    return this._casesDashboard;
  }

  get myCasesP(): Case[] {
    return this._myCasesP;
  }

  get myCasesA(): Case[] {
    return this._myCasesA;
  }

  get myCasesF(): Case[] {
    return this._myCasesF;
  }

  public timeConverter(UNIX_timestamp: any){
    let a = new Date(UNIX_timestamp["seconds"] * 1000);
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes() < 10 ? "0" + a.getMinutes() : a.getMinutes();
    let sec = a.getSeconds() < 10 ? "0" + a.getSeconds() : a.getSeconds();
    return date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  }
}
