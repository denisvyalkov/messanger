import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, User } from 'src/app/services/login.service';

interface LoginForm {
  phone: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../shared/inputs/input.scss'],
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;
  showPassword = false;
  touched = {
    password: false,
    phone: false,
  };

  constructor(public lgsvc: LoginService) {
    this.loginForm = new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        (control) => this.lgsvc.phoneValidator(control),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  login() {
    if (this.loginForm.valid) {
      console.log('valid!');

      const user: User = {
        phone: this.loginForm.value.phone || '',
        password: this.loginForm.value.password || '',
      };
      this.lgsvc.sendWsMessage('LOGIN', user);
    } else {
      console.log('invalid');
    }
  }
}
