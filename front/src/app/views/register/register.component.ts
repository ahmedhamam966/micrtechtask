import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  User } from '../../model/user';
import {UserService} from '../../services/user.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registerForm: FormGroup;
  submitted = false;
  constructor(private UserService: UserService,
    private route: ActivatedRoute,private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
       
      name: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
  });
}
get f() { return this.registerForm.controls; }

onReset() {
  this.submitted = false;
  this.registerForm.reset();
 }
 


 onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.UserService.adduser(this.registerForm.value);

    
    this.router.navigate(['/home']);
  }
}