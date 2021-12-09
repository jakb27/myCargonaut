import { Component, OnInit } from '@angular/core';
import {Case} from "../../shared/models/case";
import {CaseService} from "../../shared/services/case.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";
import {AuthService} from "../../shared/services/auth.service";
import {onSnapshot} from "@angular/fire/firestore";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  cases: Case[] = [];

  constructor(public caseService: CaseService, public modalService: NgbModal, public authService: AuthService) { }

  ngOnInit(): void {
    const q = this.caseService.readCasesDashboard();

    onSnapshot(q, (querySnapshot) => {
      this.cases = [];
      querySnapshot.forEach((doc) => {
        this.cases.push(doc.data() as Case);
      });
    });
  }

  public async create() {
    const modalReference = this.modalService.open(NewCaseModalComponent);
    try {
      const resultCase: Case = await modalReference.result;
      await this.caseService.createCase(resultCase);
    } catch(error) {
      console.log(error);
    }
  }

  public async accept(c: Case){
    c.accepter_uid = this.authService.userData.uid;
    c.status = "booked"
    await this.caseService.updateCase(c);
  }

}
