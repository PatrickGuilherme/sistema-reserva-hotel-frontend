export class RoomReserveDto{
  UserID:number;
  RoomID: number;
  DtInit: Date;
  DtEnd: Date;

  constructor(UserID:number,RoomID:number, DtInit:Date, DtEnd:Date)
  {
    this.UserID = UserID;
    this.RoomID = RoomID;
    this.DtInit = DtInit;
    this.DtEnd = DtEnd;
  }
}
