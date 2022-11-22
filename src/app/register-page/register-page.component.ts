import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService, User } from '../services/login.service';
export interface RegisterForm {
  phone: FormControl<string | null>;
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: [
    './register-page.component.scss',
    '../components/shared/inputs/input.scss',
  ],
})
export class RegisterPageComponent {
  registerForm: FormGroup<RegisterForm>;
  touched = {
    password: false,
    phone: false,
  };
  showPassword = false;

  constructor(public lgsvc: LoginService) {
    this.registerForm = new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        (control) => this.lgsvc.phoneValidator(control),
      ]),
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }

  sendSms(e: Event) {
    console.log('send sms');
  }

  registration(): void {
    const user: User = {
      phone: '7' + this.registerForm.value.phone?.replace(/[^0-9]/g, ''),
      password: this.registerForm.value.password || '',
    };
    this.setNewUser(user);
  }

  setNewUser(user: User): void {
    this.lgsvc.sendWsMessage('REG', user);
  }
}
