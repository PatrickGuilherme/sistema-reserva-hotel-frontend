import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RoomPageComponent } from './Components/room-page/room-page.component';
import { UserService } from './Services/user.service';
import { RoomService } from './Services/room.service';
import { ClientePageComponent } from './Components/cliente-page/cliente-page.component';
import { HotelPageComponent } from './Pages/hotel-page/hotel-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RoomPageComponent,
    ClientePageComponent,
    HotelPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    HttpClientModule,
    RoomService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
