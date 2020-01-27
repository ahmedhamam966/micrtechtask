import { Injectable } from '@angular/core';
import { Detail } from './../model/detail';
import { HttpClient } from '@angular/common/http';
import{Observable ,BehaviorSubject} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class DetailService {
  APIURL = 'http://localhost:3000/detail/';
  token: string;
  detail:Observable<Detail>
 
    constructor(private http: HttpClient) {
     
    }
 
 
 getdetails() {
     return this.http.get<Detail[]>(this.APIURL );
  
 }
 deletederailById(id: string) {
  return this.http.delete(this.APIURL + id);
}
 getdetail_byId(id: string) {
  return this.http.get<Detail>(this.APIURL +  id );
}
updatedetail_ById(id: string, detail: any) {
  return this.http.patch(this.APIURL  + id, detail);
} 
adddetail(detail: Detail ) {
  return this.http.post(this.APIURL , detail).subscribe();
}
 
}