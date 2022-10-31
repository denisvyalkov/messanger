import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PhoneMaskDirective } from 'src/environments/directiver/phone.directive';

@Component({
  standalone: true,
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss', '../input.scss'],
  imports: [ReactiveFormsModule, PhoneMaskDirective]
})
export class PasswordInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName = '';
  control?: FormControl | AbstractControl;
  canSeePassword = false;

  constructor() {}

  ngOnInit(): void {
    this.control = this.form.controls[this.controlName];
  }
}
