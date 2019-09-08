import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpServicesService } from '../services/http-services.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.pattern(this.passwordPattern)]],
      verify_password: ['', Validators.required],
      company: ['', Validators.required]
    }, { validator: this.matchPassword });
  }

  private matchPassword(control: AbstractControl): void {
    const password: string = control.get('password').value;
    const verifyPassword: string = control.get('verify_password').value;
    if (password !== verifyPassword) {
      control.get('verify_password').setErrors({ matchPassword: true });
    } else {
      control.get('verify_password').setErrors(null);
    }
  }

  register() {
    const registerForm = this.registerForm.value;
    this.http.register(registerForm).then(user => {
      console.log(user);
      this.authService.setToken(user.session);
      setTimeout(() => {
        this.router.navigate(['users']);
      }, 5000);
    }).catch(error => {
      alert(error.message);
    });
  }
}
