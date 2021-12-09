import { Component, OnInit } from '@angular/core';
import {Case} from "../../shared/models/case";
import {CaseService} from "../../shared/services/case.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {NewCaseModalComponent} from "../new-case-modal/new-case-modal.component";

@Component({
  selector: 'app-case-list',
  templateUrl: './case-list.component.html',
  styleUrls: ['./case-list.component.css']
})
export class CaseListComponent implements OnInit {

  cases: Case[] = [];

  constructor(public caseService: CaseService, public modalService: NgbModal) { }

  ngOnInit(): void {
    this.caseService.readCases().subscribe(data => {
      this.cases = [];
      data.forEach(item => {
        let a = item.payload.doc.data();
        this.cases.push(a as Case);
      })
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

  update(c: Case) {
    this.caseService.updateCase(c);
  }

  delete(c: Case) {
    this.caseService.deleteCase(c);
  }

}
