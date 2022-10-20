import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[phone]',
})
export class PhoneMaskDirective {
  @Input() control: AbstractControl | FormControl | undefined | null;
  mask = '(XXX)XXX-XX-XX';

  constructor() {}

  @HostListener('input', ['$event'])
  onInput(data: any) {
    this.onInputChange(data);
  }

  onInputChange(event: any) {
    let backspace = !event.data;
    let value: any = this.control!.value.replace(/\D/g, '');
    let fullValue = this.control!.value;
    console.log(fullValue);
    if (!backspace && value.length === 1) {
      this.control?.setValue('(' + value + 'XX)XXX-XX-XX');
      event.target.setSelectionRange(2, 2);
      return;
    }
    let caretPos = event.target.selectionStart;
    if (
      fullValue.charAt(caretPos) === '(' ||
      fullValue.charAt(caretPos) === ')' ||
      fullValue.charAt(caretPos) === '-'
    ) {
      caretPos++;
    }

    let leftPart = fullValue.slice(0, caretPos);
    let rightPart = fullValue.slice(caretPos);

    fullValue = leftPart + rightPart.replace('X', '');

    this.control?.setValue(fullValue);
    event.target.setSelectionRange(caretPos, caretPos);
  }
}
