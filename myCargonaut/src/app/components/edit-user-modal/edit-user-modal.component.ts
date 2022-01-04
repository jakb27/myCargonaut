import {Component, Input, OnInit} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {User} from "../../shared/models/user";
import {AuthService} from "../../shared/services/auth/auth.service";

@Component({
  selector: "app-edit-user-modal",
  templateUrl: "./edit-user-modal.component.html",
  styleUrls: ["./edit-user-modal.component.css"]
})
export class EditUserModalComponent implements OnInit {

  @Input() u!: User;

  public user!: User;

  constructor(public activeModal: NgbActiveModal, public authService: AuthService) {
  }

  ngOnInit(): void {
    this.user = this.u;
  }

  save(): void {
    if (EditUserModalComponent.isNotEmpty(this.user.displayName)
      && EditUserModalComponent.isNotEmpty(this.user.lastname)
      && EditUserModalComponent.isNotEmpty(this.user.firstname)) {
      this.activeModal.close(this.user);
    }
  }

  private static isNotEmpty(str?: string) {
    if (str != undefined) {
      return str.trim().length > 0;
    }
    return false;
  }

}
