import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }
  public user: UserInterface = {
    username: "",
    password: "",
  }

  ngOnInit() {
  }

  login() {
    console.log("intentando loguear")
    this.authService.login(this.user.username, this.user.password);
  }

}
