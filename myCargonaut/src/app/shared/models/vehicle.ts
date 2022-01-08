export interface Vehicle {
  v_id: string;
  owner_id: string; // User.uid
  seats: number;
  capacity: number;
  name: string;
  type?: VehicleType;
}

export enum VehicleType {
  combi = "Combi",
  suv = "SUV",
  van = "Van",
  cabrio = "Cabrio",
  sport = "Sport",
  coupe = "Coupe",
  compact = "Compact"
}
