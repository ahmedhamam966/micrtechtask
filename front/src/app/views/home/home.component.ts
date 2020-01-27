import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute,Router } from '@angular/router';
import { DetailService } from '../../services/detail.service';
import { UserService } from '../../services/user.service';
import { Detail } from '../../model/detail';
import { User } from '../../model/user';
import { FilterUtils } from 'primeng/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit ,OnDestroy {
  detail: Detail[]=[];
  user:User[]=[];
  cols: any[];
  detail1: Detail={_id: '',text:'',done:' ', user_id:''};

  displayDialogforadd: boolean;
  displayDialogforedit: boolean;
   
  selecteddetail: Detail;
   newdetail: boolean;

  details: Detail[];

   constructor(private DetailService:DetailService,
    private UserService:UserService,
     private _httpClient: HttpClient,    private router: Router

    ) { }

  ngOnInit() {
    this.getAll();
     this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'text', header: 'Text' },
      { field: 'done', header: 'Done' },
   ];
   
   }
  getAll() {
   
    this.DetailService.getdetails() .toPromise().
    then(details => this.details =details);
    this.UserService.getusers().toPromise().
    then(user => this.user =user);
   
  }
showDialogToAdd() {
  this.newdetail = true;
  this.detail1 =  {_id:'',done:'',text:'',user_id:'',}
   this.displayDialogforadd = true;
 }
 showDialogToedit() {
   this.displayDialogforedit = true;
 }
save(values) {
 
  let details = [...this.details];
  this.details.push(this.detail1);
 this.DetailService.adddetail(values);
 this.UserService.getprofile();

 details[this.details.indexOf(this.detail1)] = this.detail1;
 console.log(values)
this.details=details;
this.detail = null;
this.displayDialogforadd = false;
 console.log(this.details);
 this.router.navigate(['/home']);
  }

  edit(myUpdatedData){
    const id =this.selecteddetail._id
     this.DetailService.getdetails().subscribe(
      data => {
        this.detail = data;
        this.DetailService.updatedetail_ById(id, myUpdatedData).subscribe();
      }
    );
    this.displayDialogforedit = false;
    this.details[this.details.indexOf(this.selecteddetail)] = this.detail1;
    this.details = this.details;
        this.detail = null;
  }
delete() {
  const id=this.detail1._id
  let index = this.details.indexOf(this.detail1);
  this.DetailService.deletederailById(id).subscribe();
  this.details = this.details.filter((val, i) => i != index);
   this.displayDialogforedit = false;
}
onRowSelect(event) {
  this.newdetail = false;
  this.selecteddetail = this.clonedetail(event.data);
   this.displayDialogforedit = true;
}

clonedetail(c: Detail): Detail {
  let detail1=  {_id:'',done:'',text:'',user_id:'',};
  for (let prop in c) {
    detail1[prop] = c[prop];
  }
  return detail1;
}

ngOnDestroy(): void
    {
         
    }




    
}
