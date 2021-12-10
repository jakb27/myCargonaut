export interface Case {
  id: string, //TODO
  type: string,
  status: string,   // open, booked, in progress, done
  publisher_uid: string,
  accepter_uid: string,
  start: string,
  end: string,
  date: number  //TODO date
}
