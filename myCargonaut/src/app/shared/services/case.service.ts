import {Injectable} from '@angular/core';
import {Case} from "../models/case";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, query, where} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private fs: AngularFirestore) {
  }

  createCase(c: Case) {
    c.id = this.fs.createId();
    return this.fs.collection('cases').doc(c.id).set(c);
  }

  readCasesDashboard() {
    return query(collection(this.fs.firestore, 'cases'), where("accepter_uid", "==", ""));
  }

  // readCasesByID(uid: string) {
  //   return query(collection(this.fs.firestore, 'cases'), where(uid, "in", ["publisher_uid", "accepter_uid"]));
  // }

  readCasesByIDP(uid: string) {
    return query(collection(this.fs.firestore, 'cases'), where("publisher_uid", "==", uid));
  }

  readCasesByIDA(uid: string) {
    return query(collection(this.fs.firestore, 'cases'), where("accepter_uid", "==", uid));
  }

  updateCase(c: Case) {
    return this.fs.doc('cases/' + c.id).update(c);
  }

  deleteCase(c: Case) {
    console.log(c.id)
    return this.fs.doc('cases/' + c.id).delete();
  }
}
