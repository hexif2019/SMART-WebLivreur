import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../models/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user: User | null;

  constructor(
    private router: Router,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.userService.onLogin().subscribe(user => {
      this.user = user;
      console.log("nav user login!");
    });
    this.userService.onLogout().subscribe(user => {
      this.user = null;
      console.log("nav user logout!");
    });
    this.user = this.userService.getUser();
  }

  logout(){
    this.userService.logout();
  }



}
