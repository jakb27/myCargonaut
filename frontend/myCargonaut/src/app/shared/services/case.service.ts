import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {Case} from "../models/case";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private fs: AngularFirestore) { }

  createCase(c: Case){
    return this.fs.collection('case-list').add(c);
  }

  readCases() {
    return this.fs.collection('case-list').snapshotChanges();
  }

  updateCase(c: Case) {
    return this.fs.doc('case-list/' + c.id).update(c);
  }

  deleteCase(c: Case) {
    return this.fs.doc('case-list/' + c.id).delete();
  }
}
