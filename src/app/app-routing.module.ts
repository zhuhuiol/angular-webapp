import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';

const routes: Routes = [
{
  path: "login",
  component: LoginComponent
},
{
  path: "",
  component: MenuComponent,
  pathMatch: 'full'
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
