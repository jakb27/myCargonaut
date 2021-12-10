import { Component, OnInit } from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Case} from "../../shared/models/case";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-new-offer-modal',
  templateUrl: './new-case-modal.component.html',
  styleUrls: ['./new-case-modal.component.css']
})
export class NewCaseModalComponent implements OnInit {

  public case!: Case;
  public type = "query";

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {
    this.case = {publisher_uid: authService.userData.uid, type: this.type, status: "open", start: "", end: "", date: Date.now(), id: "", accepter_uid: ""}
  }

  ngOnInit(): void {
  }

  save(): void {
    if(NewCaseModalComponent.isNotEmpty(this.case.start) && NewCaseModalComponent.isNotEmpty(this.case.end)) {
      this.case.type = this.type;
      this.activeModal.close(this.case);
    }
  }

  private static isNotEmpty(str?: string) {
    if(str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

}
