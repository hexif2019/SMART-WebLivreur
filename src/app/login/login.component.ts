import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {FormControl} from '@angular/forms';
import {Residence} from '../models/residence';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  residances: Residence[] = [];

  nom: string;
  prenom: string;
  email: string;
  password: string;
  residance: Residence;
  ville: string;
  adresse: string;

  loadLogin = false;
  msgLoginError: string;
  msgRegisterError: string;
  @Input() showRegister: boolean;

  codepostal = new FormControl();
  valideCp = false;
  loadResidance = false;

  @Output() onLogin = new EventEmitter<User>();

  constructor(private userService: UserService) {}


  login() {
    this.loadLogin = true;
    this.userService.login(this.email, this.password)

      .subscribe(
        user => {
          console.log('LOGIN SUCCESS', user);
          this.onLogin.emit(user);
        },
        fail => {
          this.msgLoginError = JSON.stringify(fail);
        },
        () => {
          this.loadLogin = false;
        }
      );
  }

}
