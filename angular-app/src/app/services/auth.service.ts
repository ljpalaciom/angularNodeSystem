
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { DataSharingService } from './data-sharing.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  token: String;

  constructor(private http: HttpClient, private router: Router, private dataSharingService: DataSharingService) { }

  isAuthenticated(): boolean {
    let jwtHelper = new JwtHelperService();
    const token = localStorage.getItem('auth_token');
    return token != null && !jwtHelper.isTokenExpired(token);
  }

  login(username: string, password: string) {
    this.http.post(environment.url + '/login', { username: username, password: password })
      .subscribe((resp: any) => {
        localStorage.setItem('auth_token', resp.token);
        localStorage.setItem('username', username);
        this.dataSharingService.changeNavBar.next(true);
        this.router.navigate(['data']);
      }, error => {
        if (error.status == 401) {
          alert("Credenciales incorrectas");
        } else {
          alert("Ha ocurrido un error");
        }
      }
      )
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('username');
    this.dataSharingService.changeNavBar.next(true);
    this.router.navigate(['login'])
  }

  getToken() {
    return localStorage.getItem("auth_token");
  }

  getUsername() {
    return localStorage.getItem("username");
  }
}
