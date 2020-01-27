import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SidebarModule} from 'primeng/sidebar';
import{FormsModule}from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { HomeComponent } from './views/home/home.component';
import {AuthInterceptor} from './helpers/admin-intersptors';

import {ErrorInterceptor} from './helpers/error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {UserService} from './services/user.service';
import { DetailService} from './services/detail.service';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import { FirecompComponent } from './views/firecomp/firecomp.component';

 @NgModule({
  declarations: [
    AppComponent,

    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    FirecompComponent,
 
  ],
  imports: [BrowserAnimationsModule,
    BrowserModule,DialogModule, 
    AppRoutingModule,TableModule,ButtonModule,
    SidebarModule,HttpClientModule,FormsModule,ReactiveFormsModule
  ],
  providers: [ UserService,DetailService,
    {
        provide : HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
          },
          { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

],
  bootstrap: [AppComponent]
})
export class AppModule { }
