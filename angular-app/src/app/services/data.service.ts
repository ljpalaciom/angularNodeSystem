import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DataInterface } from '../models/data-interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private authService: AuthService, private http: HttpClient) { }
  
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    "access-token": this.authService.getToken()
  });
  
  getData() {
    const url_api = 'http://localhost:3000/api/data';
    return this.http.get<DataInterface[]>(url_api, { headers: this.headers })
  }
}
