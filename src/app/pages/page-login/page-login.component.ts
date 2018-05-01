import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {

  showRegister: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.showRegister = this.route.snapshot.data['showRegister'];
    if(this.userService.getUser()){
      this.router.navigateByUrl('/home');
    }
    this.userService.onLogin().subscribe(
      user => this.router.navigateByUrl('/home')
    );

  }

  onLogin(){
    //this.router.navigateByUrl('/home');
  }

}
