import { Component, OnInit } from '@angular/core';
import {  UserService } from '../../services/user.service';
import { User } from '../../model/user';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router,
    private UserService:UserService,
    ) { }

  ngOnInit() {
  }
  logout() {
    this.UserService.logout();
    this.router.navigate(['/login']);
}
}
