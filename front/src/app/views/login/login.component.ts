import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {User } from './../../model/user';
import {UserService} from './../../services/user.service';
import { ActivatedRoute,Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from "rxjs";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  User:User;
  submitted = false;
  error = '';
  private authStatusSub: Subscription;
  isLoading = false;
  constructor( private _formBuilder: FormBuilder,
    private UserService:UserService,
    private router: Router) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
  });
  this.authStatusSub = this.UserService.getAuthStatusListener().subscribe(
    authStatus => {
        this.isLoading = false;
    }
  );
  }
  get f() { return this.loginForm.controls; }




 
  loginUser(values) {
    this.submitted = true;
    if (this.loginForm.invalid) {
        return alert("not correct password or email");
    }
    this.UserService.login(this.f.email.value, this.f.password.value)}
    ngOnDestroy() {
        this.authStatusSub.unsubscribe();
      }
}
