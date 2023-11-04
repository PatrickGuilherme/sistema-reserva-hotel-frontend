import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './Pages/login-page/login-page.component';
import { RoomPageComponent } from './Components/room-page/room-page.component';
import { ClientePageComponent } from './Components/cliente-page/cliente-page.component';

const routes: Routes = [
  { path: '', component: LoginPageComponent},
  { path: 'room-hotel', component: RoomPageComponent},
  { path: 'cliente', component: ClientePageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
