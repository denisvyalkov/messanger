import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.scss']
})
export class PasswordInputComponent implements OnInit {
  @Input() form!: FormGroup;
  @Input() controlName = '';
  control?: FormControl | AbstractControl;
  canSeePassword = false;
  
  constructor() {
  }

  ngOnInit(): void {
    this.control = this.form.controls[this.controlName]
  }

}
