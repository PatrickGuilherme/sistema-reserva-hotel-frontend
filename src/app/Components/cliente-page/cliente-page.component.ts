import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';
import { Room } from 'src/app/model/room';

@Component({
  selector: 'app-cliente-page',
  templateUrl: './cliente-page.component.html',
  styleUrls: ['./cliente-page.component.css']
})
export class ClientePageComponent implements OnInit {
  public list_room:Room[];

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
