import {
  Component,
  EventEmitter,
  Input,
  AfterContentInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { PhoneMaskDirective } from 'src/environments/directiver/phone.directive';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';

@Component({
  standalone: true,
  selector: 'app-phone-input',
  templateUrl: './phone-input.component.html',
  styleUrls: ['./phone-input.component.scss', '../input.scss'],
  imports: [ReactiveFormsModule, PhoneMaskDirective, CommonModule],
})
export class PhoneInputComponent implements AfterContentInit {
  @Input() form!: FormGroup;
  @Input() controlName = '';
  @Output() isCodeSended = new EventEmitter();

  control!: FormControl | AbstractControl;
  canSeePassword = false;
  touched = false;

  constructor(public usersvc: UserService) {}

  sendSms(): void {
    console.log('child');
    this.isCodeSended.emit();
  }

  ngAfterContentInit(): void {
    this.control = this.form.controls[this.controlName];
  }
}
