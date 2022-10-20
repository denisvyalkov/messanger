import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[phone]',
})
export class PhoneMaskDirective {
  @Input() control: AbstractControl | FormControl | undefined | null;
  mask = ' (XXX) XXX-XX-XX';

  constructor() {}

  @HostListener('input', ['$event'])
  onInput(data: any) {
    this.onInputChange(data);
  }

  onInputChange(event: any) {
    console.log(event)
    let backspace = !event.data;
    let value: any = this.control!.value.replace(/\D/g, '');
    if (backspace && value.length <= 6) {
      value = value.substring(0, value.length - 1);
    }
    if (value.length === 1) {
      value = ' (' + value + this.mask.slice(3, this.mask.length);
      this.control?.setValue(value);
      console.log(value);
      return;
    } else if (value.length <= 3) {
      value = value.replace(/^(\d{0,3})/, '$1');
    } else if (value.length <= 6) {
      value = value.replace(/^(\d{0,3})(\d{0,3})/, '$1$2');
    } else if (value.length <= 10) {
      value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1$2$3');
    } else {
      value = value.substring(0, 10);
      value = value.replace(/^(\d{0,3})(\d{0,3})(\d{0,4})/, '$1$2$3');
    }
    let finalMask = this.mask;
    let finalValue = value;


    for (let i = 0; i < finalValue.length; i++) {
      value = finalMask.replace('X', finalValue.charAt(i));
      finalMask = value;
    }

    this.control?.setValue(value);
  }
}
