import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { DataInterface } from '../models/data-interface';
import { environment } from 'src/environments/environment';

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
    return this.http.get<DataInterface[]>(environment.url + '/data', { headers: this.headers })
  }
}
