import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserInterface } from '../models/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient, private router: Router) { }

  createUser(user: UserInterface) {
    return this.http.post(environment.url + '/user', user).subscribe((resp: any) => {
      this.router.navigate(['login/']);
    }, error => {
      console.log(JSON.stringify(error))
      if (error.status == 400) {
        alert(error.error.message);
      } else {
        alert("Ha ocurrido un error");
      }
    }
    )
  }
}
