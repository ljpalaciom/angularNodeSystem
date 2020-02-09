import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  formRegistration: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private registration: RegistrationService) { }
  ngOnInit() {
    this.formRegistration = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],  
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
    })
  }

  createUser() {
    this.submitted = true;
    if (this.formRegistration.invalid) {
      return;
    }
    this.registration.createUser(this.formRegistration.value);
  }
}
