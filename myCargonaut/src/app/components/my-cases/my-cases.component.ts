import {Component, OnInit} from '@angular/core';
import {CaseService} from "../../shared/services/case.service";
import {Case} from "../../shared/models/case";
import {AuthService} from "../../shared/services/auth.service";
import {onSnapshot} from "@angular/fire/firestore";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-my-cases',
  templateUrl: './my-cases.component.html',
  styleUrls: ['./my-cases.component.css']
})
export class MyCasesComponent implements OnInit {

  myCasesP: Case[] = [];
  myCasesA: Case[] = [];

  constructor(public caseService: CaseService, public authService: AuthService, public modalService: NgbModal) {
  }

  ngOnInit(): void {
    const queryPublished = this.caseService.readCasesByIDP(this.authService.userData.uid);
    const queryAccepted = this.caseService.readCasesByIDA(this.authService.userData.uid);

    onSnapshot(queryPublished, (querySnapshot) => {
      this.myCasesP = [];
      querySnapshot.forEach((doc) => {
        this.myCasesP.push(doc.data() as Case);
      });
    });
    onSnapshot(queryAccepted, (querySnapshot) => {
      this.myCasesA = [];
      querySnapshot.forEach((doc) => {
        this.myCasesA.push(doc.data() as Case);
      });
    });

    //TODO 2 queries as 1 with where(uid in published/accepted)

    // const q = this.caseService.readCasesByIDA(this.authService.userData.uid);
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

  public async create() {
    const modalReference = this.modalService.open(NewCaseModalComponent);
    try {
      const resultCase: Case = await modalReference.result;
      await this.caseService.createCase(resultCase);
    } catch (error) {
      console.log(error);
    }
  }

  public async edit(c: Case) {
    const modalReference = this.modalService.open(null); // TODO EditCaseModalComponent
    modalReference.componentInstance.c = c;

    try {
      const resultCase: Case = await modalReference.result;
      await this.caseService.updateCase(resultCase);
    } catch (error) {
      console.log(error);
    }
  }

  public async delete(c: Case) {
    await this.caseService.deleteCase(c);
  }

  public async unaccept(c: Case) {
    c.accepter_uid = "";
    c.status = "open";
    await this.caseService.updateCase(c);
  }

  public async cancel(c: Case) {

  }

}
