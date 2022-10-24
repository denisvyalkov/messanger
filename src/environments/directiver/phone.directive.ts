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

  onInputChange(event: InputEvent) {
    let backspace = !event.data;
    let value: string = this.control!.value.replace(/\D/g, '');
    let fullValue = this.control!.value;

    if (!backspace && value.length === 1) {
      this.control?.setValue('(' + value + 'XX)XXX-XX-XX');
      (event.target as HTMLInputElement).setSelectionRange(2, 2);
      return;
    }
    let caretPos: number =
      (event.target as HTMLInputElement).selectionStart || 0;

    let leftPart: string = fullValue.slice(0, caretPos - 1);
    let rightPart: string = fullValue.slice(caretPos);

    if (backspace) {
      let countOfMask: number =
        this.mask.length - (leftPart.length + rightPart.length);
      let result = leftPart;
      if (countOfMask) {
        for (let i = leftPart.length; i < leftPart.length + countOfMask; i++) {
          result += this.mask.charAt(i);
        }
      }
      result += rightPart;
      console.log(result);
      this.control?.setValue(result);
      return;
    }

    fullValue = leftPart + rightPart.replace('X', event.data as string);

    if (
      fullValue.charAt(caretPos) === '(' ||
      fullValue.charAt(caretPos) === ')' ||
      fullValue.charAt(caretPos) === '-'
    ) {
      caretPos++;
    }

    this.control?.setValue(fullValue);
    (event.target as HTMLInputElement).setSelectionRange(caretPos, caretPos);
  }
}
