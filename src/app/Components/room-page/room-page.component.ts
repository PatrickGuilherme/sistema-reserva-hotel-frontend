import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoomService } from 'src/app/Services/room.service';
import { UserService } from 'src/app/Services/user.service';
import { Room } from 'src/app/model/room';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-room-page',
  templateUrl: './room-page.component.html',
  styleUrls: ['./room-page.component.css']
})
export class RoomPageComponent implements OnInit {
  public list_room:Room[];
  private UsuarioLogado:User;

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private userService:UserService,
    private roomService:RoomService)
  {
    this.list_room = new Array<Room>();
    this.UsuarioLogado = new User();
  }

  public Sair(){
    this.userService.Logoff(this.route,this.router);
  }

  public MudarStatusRoom(idRoom:number){
    this.roomService.UpdateStatusRoom(idRoom).subscribe(
      Response=>{
        console.log("Mudou status")
        this.StartRoom();

      },
      error =>{
        console.log("Error - Mudou status")
      }
    )
  }

  public GetUsuarioLogado(): Observable<any>{
    return new Observable((observer) =>{
      let usuarioLogadoLocal = this.userService.GetUserLogged();

      if(usuarioLogadoLocal){
        console.log("Usuário logado")
        this.UsuarioLogado = usuarioLogadoLocal;
        console.log(this.UsuarioLogado);
        observer.next(this.UsuarioLogado);
        observer.complete();
      }else{
        this.router.navigate([''], {relativeTo: this.route});
      }
    });
  }

  public GetRoomHotel(hotelId:number){
    this.roomService.GetRoomHotel(hotelId).subscribe(
      Response =>{
        console.log("quartos do hotel logado");
        this.list_room = Response;
        console.log(this.list_room)
      },
      Error => {
        console.log("Erro na operação do banco de dados")
      }
    )
  }

  public StartRoom():void{
    this.GetUsuarioLogado().subscribe(
      (usuariologado:User) => {
        console.log(usuariologado.HotelId)
        this.GetRoomHotel(1);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    this.StartRoom();
  }
}
