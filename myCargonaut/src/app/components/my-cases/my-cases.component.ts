import { Component, OnInit } from '@angular/core';
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

  myCases: Case[] = [];

  constructor(public caseService: CaseService, public authService: AuthService, public modalService: NgbModal) { }

  ngOnInit(): void {
    const q = this.caseService.readCasesByID(this.authService.userData.uid);

    onSnapshot(q, (querySnapshot) => {
      this.myCases = [];
      querySnapshot.forEach((doc) => {
        this.myCases.push(doc.data() as Case);
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

}
