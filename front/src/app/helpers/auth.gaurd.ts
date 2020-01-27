import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";

import { UserService } from '../services/user.service';
 
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  
    constructor(
        private router: Router,
        private UserService: UserService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
         if (localStorage.getItem('token'   )) {
            return true;
            
          }
      
          this.router.navigate(['/login']);
          return false;
        }
    
  }
