import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router,) { }
  public user: UserInterface = {
    username: "",
    password: "",
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user.username, this.user.password);   
  }

}
