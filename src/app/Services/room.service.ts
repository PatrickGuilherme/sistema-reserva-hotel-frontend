import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { RoomReserveDto } from '../model/RoomReserveDto';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl:string

  //Construtor
  constructor(private http: HttpClient){
      this.baseUrl = `${environment.baseUrl}/Room`;
  }

  //Get quartos do hotel
  public GetRoomHotel(idHotel:number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/get-room-all/${idHotel}`);
  }

  //Atualizar status do quarto
  public UpdateStatusRoom(idRoom: number):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/update-status-room/${idRoom}`);
  }

  //Get quartos dsiponiveis
  public GetRoomAtivo(): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/get-room-ativo`);
  }

  public SetRooReserve(roomReserveDto:RoomReserveDto): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/agendar-quarto`,roomReserveDto);
  }
}
