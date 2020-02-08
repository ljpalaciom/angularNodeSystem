
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
@Injectable({
  providedIn: "root"
})
export class AuthService {

  url = 'http://localhost:3000/api';
  token: String;

  constructor(private http: HttpClient, private router: Router) { }
  
  isAuthenticated(): boolean {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('auth_token');
    return token != null && !jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    this.http.post(this.url + '/login', { username: username, password: password })
      .subscribe((resp: any) => {

        this.router.navigate(['data']);
        
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('username', username);
      })
  }

  logout() {
    // const url_api = `http://localhost:3000/api/Users/logout?access_token=${accessToken}`;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.router.navigate(['login'])
  }
 
  getToken() {
    return localStorage.getItem("auth_token");
  }

  getUsername(){
    return localStorage.getItem("username");
  }
}
