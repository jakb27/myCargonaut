import {Component, Input, OnInit} from '@angular/core';
import {Case} from "../../shared/models/case";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-edit-case-modal',
  templateUrl: './edit-case-modal.component.html',
  styleUrls: ['./edit-case-modal.component.css']
})
export class EditCaseModalComponent implements OnInit {

  @Input() c!: Case;

  public case!: Case;
  public type = "query";

  constructor(public activeModal: NgbActiveModal, private authService: AuthService) {
    this.case = {publisher_uid: authService.userData.uid, type: "", status: "open", start: "", end: "", date: Date.now(), id: "", accepter_uid: ""}
  }

  ngOnInit(): void {
    this.case.start = this.c.start;
    this.case.end = this.c.end;
    this.case.id = this.c.id;
  }

  save(): void {
    if(EditCaseModalComponent.isNotEmpty(this.case.start) && EditCaseModalComponent.isNotEmpty(this.case.end)) {
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
