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
    let backspace = event.data === null; //is backspace pressed

    const value: string = this.control!.value.replace(/\D/g, ''); // pure value without specs symbols
    let fullValue = this.control!.value;

    if (!backspace && value.length === 1) {
      //when user 1st time input the value we should set the mask into input
      this.control?.setValue('(' + value + 'XX)XXX-XX-XX');
      (event.target as HTMLInputElement).setSelectionRange(2, 2);
      return;
    }

    let caretPos: number =
      (event.target as HTMLInputElement).selectionStart || 0;

    const leftPart: string = fullValue.slice(0, caretPos - 1); //left part of input value without new data
    let rightPart: string = fullValue.slice(caretPos); //right part of input value

    //non-numeric input
    if (
      !event ||
      event.data === undefined ||
      (event.data !== null && isNaN(+event.data))
    ) {
      this.control?.setValue(leftPart + rightPart);
      (event.target as HTMLInputElement).setSelectionRange(
        caretPos - 1,
        caretPos - 1
      );
      return;
    }

    const countOfMask: number =
      this.mask.length - (leftPart.length + rightPart.length); // the lengtgh of missed text

    if (countOfMask) {
      fullValue = leftPart;

      for (let i = leftPart.length; i < leftPart.length + countOfMask; i++) {
        fullValue += this.mask.charAt(i);
      }
      if (!backspace) {
        rightPart = event.data + rightPart.replace('X', '');
        console.log(rightPart);
      }
      fullValue += rightPart;
      this.control?.setValue(fullValue);
      (event.target as HTMLInputElement).setSelectionRange(caretPos, caretPos);
      return;
    }

    fullValue = leftPart + rightPart.replace('X', event.data as string); //simple input

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
