import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Case} from "../../shared/models/case";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: "app-rating-modal",
  templateUrl: "./rating-modal.component.html",
  styleUrls: ["./rating-modal.component.css"]
})
export class RatingModalComponent implements OnInit {

  @Input() c!: Case;

  public case!: Case;

  ctrl = new FormControl(null, Validators.required);

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.case = this.c;
  }

  save() {
    if(this.ctrl.value > 0){
      this.case.rating = this.ctrl.value;
      this.activeModal.close(this.case);
    }
  }

}
