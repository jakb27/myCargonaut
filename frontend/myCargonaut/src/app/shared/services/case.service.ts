import { Injectable } from '@angular/core';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";
import {Case} from "../models/case";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, DocumentData,
  getDocs,
  onSnapshot,
  query,
  QueryDocumentSnapshot,
  where
} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private fs: AngularFirestore) {
  }

  createCase(c: Case) {
    return this.fs.collection('cases').add(c);
  }

  readCases() {
    return this.fs.collection('cases').snapshotChanges();
  }

  readCasesByID(uid: string) {
    return query(collection(this.fs.firestore, 'cases'), where("uid", "==", uid));
  }

  updateCase(c: Case) {
    return this.fs.doc('cases/' + c.id).update(c);
  }

  deleteCase(c: Case) {
    return this.fs.doc('cases/' + c.id).delete();
  }
}
