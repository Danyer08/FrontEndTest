import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Login } from '../models/login';
import { HttpServicesService } from '../services/http-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private httpServices: HttpServicesService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const loginForm: Login = this.loginForm.value;
    console.log(loginForm);
    this.httpServices.login(loginForm).then(response => {
      alert(response);
      this.router.navigate(['users']);
    }).catch(error => {
      alert(error);
    });
  }
}