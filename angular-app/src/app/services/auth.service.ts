
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  url = 'http://localhost:3000/api';
  token: String;

  constructor(private http: HttpClient, private router: Router) { }

  login(username: string, password: string) {
    this.http.post(this.url + '/login', { username: username, password: password })
      .subscribe((resp: any) => {

        this.router.navigate(['data']);
        
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('username', username);
      })
  }

  logout() {
    // let accessToken = localStorage.getItem("accessToken");
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
