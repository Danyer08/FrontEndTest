import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpServicesService } from '../services/http-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpServicesService,
    private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      verifyPassword: ['', Validators.required],
      company: ['', Validators.required]
    });
  }

  register() {
    const registerForm = this.registerForm.value;
    console.log(registerForm);
    this.http.register(registerForm).then(response => {
      console.log(response);
      this.router.navigate(['login']);
    }).catch(error => {
      alert(error);
    });
  }

  verifyPassword() {
    const password = this.registerForm.get('password');
    const verifiedPassword = this.registerForm.get('verifyPassword');
    password !== verifiedPassword ? alert('Password must be equals') : console.log('good');
  }

}
