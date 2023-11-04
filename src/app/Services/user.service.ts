import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { LoginDto } from '../model/loginDto';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl:string

  //Construtor
  constructor(private http: HttpClient){
      this.baseUrl = `${environment.baseUrl}/user`;
  }

  //[LOGIN] Efetuar login
  public Login(loginDto:LoginDto): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}`,loginDto);
  }

  public SetUserLogged(Response:any, route: ActivatedRoute, router:Router):void{
    //Cria o usuário
    let result = Response;
    let userLogged:User = new User();
    userLogged.id = result.id;
    userLogged.name = result.name;
    userLogged.email = result.email;
    userLogged.typeUser = result.typeUser;
    userLogged.HotelId = result.hotelId;
    console.log("Usuario logado - SET")
    console.log(userLogged);

    //Encripta dados, criar sessão e redireciona
    sessionStorage.setItem("SessionUsers",JSON.stringify(userLogged));

    if(userLogged.typeUser == 1){//hotel
      console.log("Hotel")
      router.navigate(['/room-hotel'], {relativeTo: route});
    }else{
      console.log("Cliente")
      router.navigate(['/cliente'], {relativeTo: route});
    }

  }

  //[DELETE] Excluir uma sessão
  public Logoff(route: ActivatedRoute, router:Router):void{
    sessionStorage.removeItem("SessionUsers");
    router.navigate(['/'], {relativeTo: route});
  }

  public GetUserLogged():User{
    var ciphertext = sessionStorage.getItem("SessionUsers");
    //Usuário não logado
    if(ciphertext === null) return null;
    //Criação de usuário
    let result = JSON.parse(ciphertext);
    let user:User = new User();
    user.id = result.id;
    user.name = result.name;
    user.email = result.email;
    user.typeUser = result.typeUser;
    user.HotelId = result.HotelId;

    return user;
  }
}
