import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 import{FirecompComponent}from './views/firecomp/firecomp.component'
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './helpers/auth.gaurd';

const routes: Routes = [ 
  {path:'',component:FirecompComponent},
  {
  path:'home', component: HomeComponent,pathMatch:'full',   canActivate: [AuthGuard], 
},
  { path:'login', component: LoginComponent,},
  { path:'register', component: RegisterComponent},
  
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
