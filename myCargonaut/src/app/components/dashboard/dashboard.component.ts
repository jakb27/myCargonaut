import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../shared/services/auth/auth.service";
import {VehicleService} from "../../shared/services/vehicle/vehicle.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {

  constructor(public authService: AuthService, private vehicleService: VehicleService) {
  }

  ngOnInit(): void {
    this.authService.getUserData();
    this.vehicleService.readVehicles();
  }

}
