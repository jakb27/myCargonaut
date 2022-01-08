import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {Case} from "../../shared/models/case";

@Component({
  selector: "app-rating-modal",
  templateUrl: "./rating-modal.component.html",
  styleUrls: ["./rating-modal.component.css"]
})
export class RatingModalComponent implements OnInit {

  @Input() c!: Case;

  public case!: Case;
  public currentRate!: number;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
    this.case = this.c;
  }

  save() {
    this.case.rating = this.currentRate;
    this.activeModal.close(this.case);
  }

}
