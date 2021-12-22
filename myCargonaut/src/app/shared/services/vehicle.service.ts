import {Injectable} from "@angular/core";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Vehicle} from "../models/vehicle";
import {collection, onSnapshot, query} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class VehicleService {

  private _vehicles!: Vehicle [];

  constructor(private fs: AngularFirestore, private authService: AuthService) {
  }

  createVehicle(v: Vehicle) {
    v.v_id = this.fs.createId();
    return this.fs.collection("users/").doc(this.authService.userData.uid).collection("/vehicles").doc(v.v_id).set(v);

  }

  readVehicles() {
    if (this.authService.userData) {
      const q = query(collection(this.fs.firestore, "users/" + this.authService.userData.uid + "/vehicles"));

      onSnapshot(q, (querySnapshot) => {
        this._vehicles = [];
        querySnapshot.forEach((doc) => {
          this._vehicles!.push(doc.data() as Vehicle);
        });
      });
    }
  }

  updateVehicle(v: Vehicle) {
    return this.fs.doc("users/" + this.authService.userData.uid + "/vehicles/" + v.v_id).update(v);
  }

  deleteVehicle(v: Vehicle) {
    return this.fs.doc("users/" + this.authService.userData.uid + "/vehicles/" + v.v_id).delete();
  }

  get vehicles(): Vehicle[] {
    return this._vehicles;
  }
}
