import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Vehicle} from "../models/vehicle";
import {Case} from "../models/case";
import {collection, query, where} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class VehicleService {

  constructor(private fs: AngularFirestore, private authService: AuthService) {
  }

  createVehicle(v: Vehicle) {
    v.v_id = this.fs.createId();
    return this.fs.collection("users/").doc(this.authService.userData.uid).collection("/vehicles").doc(v.v_id).set(v);

  }

  readVehicles() {
    return query(collection(this.fs.firestore, "users/" + this.authService.userData.uid + "/vehicles"));
  }

  updateVehicle(v: Vehicle) {
    return this.fs.doc("users/" + this.authService.userData.uid + "/vehicles" + v.v_id).update(v);
  }

  deleteVehicle(v: Vehicle) {
    return this.fs.doc("users/" + this.authService.userData.uid + "/vehicles" + v.v_id).delete();
  }
}
