import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpServicesService } from '../services/http-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  passwordPattern = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}';

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
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      verifyPassword: ['', Validators.required],
      company: ['', Validators.required]
    }, { validator: this.matchPassword });
  }

  private matchPassword(control: AbstractControl): void {
    const password: string = control.get('password').value;
    const verifyPassword: string = control.get('verifyPassword').value;
    if (password !== verifyPassword) {
      control.get('verifyPassword').setErrors({ matchPassword: true });
    } else {
      control.get('verifyPassword').setErrors(null);
    }
  }

  register() {
    const registerForm = this.registerForm.value;
    this.http.register(registerForm).then(() => {
      this.router.navigate(['account/login']);
    }).catch(error => {
      alert(error.message);
    });
  }
}
