import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';
import { RoomReserveDto } from 'src/app/model/RoomReserveDto';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.css']
})
export class ClientePageComponent implements OnInit {
  public list_room:Room[];
  public DtInitTXT:string;
  public DtEndTXT:string;
  public MsgUsuarioReserva:string;
  constructor(private roomService:RoomService,
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    this.GetRoomHotel();
  }

  public Sair(){
    this.userService.Logoff(this.route,this.router);
  }

  public ReserveRoom(room:Room){
    let user = this.userService.GetUserLogged();
    this.DtInitTXT = '2023-01-01';
    this.DtEndTXT = '2023-12-31';
    let DtInit: Date = new Date(this.DtInitTXT);
    let DtEnd: Date = new Date(this.DtEndTXT);
    let roomReserveDto:RoomReserveDto = new RoomReserveDto(user.id,room.id,DtInit,DtEnd);

    this.roomService.SetRooReserve(roomReserveDto).subscribe(
      Response => {
        this.MsgUsuarioReserva = `${user.name} seu agendamento no ${room.hotel.name} para o quarto ${room.roomNumber} no andar ${room.floor} foi realizado, em breve o hotel entrará em contato para confirmar a reserva. \nO quarto constará como ocupado assim que o hotel confirmar sua reserva`;
        window.alert(this.MsgUsuarioReserva);
      },
      Error => {
        this.MsgUsuarioReserva = "";
        console.log("Erro na operação do banco de dados")
      }
    );
  }

  public GetRoomHotel(){
    this.roomService.GetRoomAtivo().subscribe(
      Response =>{
        this.list_room = Response;
        console.log(this.list_room)
      },
      Error => {
        console.log("Erro na operação do banco de dados")
      }
    )
  }

}
