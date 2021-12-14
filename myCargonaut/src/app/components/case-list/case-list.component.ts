import {Component, OnInit} from '@angular/core';
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
  showOwn: boolean = true;
  type_offer: string = "offer";

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

  public toggleShowOwn (){
    this.showOwn = !this.showOwn;
  }

  public timeConverter(UNIX_timestamp: any){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
    let sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
    return date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
  }
}
