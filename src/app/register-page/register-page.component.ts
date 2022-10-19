import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
export interface RegisterForm {
  phone: FormControl<string | null>;
  login: FormControl<string | null>;
  password: FormControl<string | null>;
}
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})

export class RegisterPageComponent {
  registerForm: FormGroup<RegisterForm>;
  @ViewChild('phone') el!: ElementRef;
  mask = [
    '(',
    /[1-9]/,
    /\d/,
    /\d/,
    ')',
    ' ',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  showPassword = false;

  constructor() {
    this.registerForm = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
