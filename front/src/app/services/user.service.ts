import { Injectable } from '@angular/core';
import { User } from './../model/user';
import { HttpClient } from '@angular/common/http';
import{Observable ,BehaviorSubject} from 'rxjs';
import { map } from 'rxjs/operators';
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  APIURL = 'http://localhost:3000/user';
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>(); 
  user:Observable<User>
  
    constructor(private http: HttpClient, private router: Router) {
      
    }
    
   
 
 getusers() {
   return this.http.get<User[]>(this.APIURL );
 }
 getIsAuth() {
  return this.isAuthenticated;
}

getUserId() {
  return this.userId;
}

getAuthStatusListener() {
  return this.authStatusListener.asObservable();
}
loggedin(){
  return !!localStorage.getItem('token')
}

 getToken(){
  let token= localStorage.getItem('token')
  return token;
}
login(email: string, password: string) {
   return this.http.post<{ user:User,token: string }>(
      this.APIURL + "/login",
      {email:email,password:password}
    )
    .subscribe(
      response => {
        this.token = response.token;
        localStorage.setItem('token', response.token)        
        this.router.navigate(["/home"]);

      },
      error => {
        this.authStatusListener.next(false);
        this.router.navigate(["/login"]);

      }
    );
}
logout() {
  localStorage.removeItem("token");

   this.router.navigate(["/login"]);
}

adduser(User: User) {
  return this.http.post<{user:User, token:string}>(this.APIURL , User).subscribe(
    response=>{
      this.token = response.token        
        
      localStorage.setItem('token', response.token)
    });
}
private setAuthTimer(duration: number) {
  console.log("Setting timer: " + duration);
  this.tokenTimer = setTimeout(() => {
    this.logout();
  }, duration * 1000);
}
autoAuthUser() {
  const authInformation = this.getAuthData();
  if (!authInformation) {
    return;
  }
     
}

private saveAuthData(token: string, expirationDate: Date, userId: string) {
  localStorage.setItem("token", token);
  
}

private clearAuthData() {
  localStorage.removeItem("token");
  
}

private getAuthData() {
  const token = localStorage.getItem("token");
   
  if (!token ) {
    return;
  }
  return {
    token: token,
    };
}
getprofile(){
  return this.http.get<User[]>(this.APIURL +'/me');

}

}
 