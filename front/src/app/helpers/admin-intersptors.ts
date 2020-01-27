import { UserService } from '../services/user.service';
 import{HttpInterceptor, HttpRequest,HttpHandler} from '@angular/common/http';
import{Injectable} from '@angular/core';
 @Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private UserService:UserService){}
        intercept(req: HttpRequest<any>, next: HttpHandler){
            const AuthToken= this.UserService.getToken();
            const authRequest = req.clone({
                headers:req.headers.set('Authorization','Bearer '+ AuthToken)
          
            })
 
            return next.handle(authRequest)


        }
}