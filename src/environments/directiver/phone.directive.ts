import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Directive({
  standalone: true,
  selector: '[phone]',
})
export class PhoneMaskDirective {
  @Input() control: AbstractControl | FormControl | undefined | null;

  /**default mask, need update for another symbols */
  mask = '(XXX)XXX-XX-XX';
  prev = '';

  constructor() {
    this.control?.setValue(this.mask);
  }

  @HostListener('input', ['$event'])
  onInput(data: InputEvent) {
    this.onInputChange(data);
  }

  onInputChange(event: InputEvent) {
    if (!event || !this.control) return;

    /**1st input setter */
    if (this.control && this.control.value.length < 2) {
      if (event.data === null) {
        this.control.setValue(this.mask);
      } else {
        let value = this.mask.replace('X', event.data);
        this.control.setValue(value);
        (event.target as HTMLInputElement).setSelectionRange(2, 2);
      }
      return;
    }
    this.prev = this.control.value;
    let caretPos: number =
      (event.target as HTMLInputElement).selectionStart || 0;
    let leftPart: string = this.control.value.slice(0, caretPos - 1);
    let rightPart: string = this.control.value.slice(caretPos);

    if (event.data !== null) {
      this.control.setValue(leftPart + rightPart.replace('X', event.data));
      if (rightPart[0] !== 'X') caretPos++;
      (event.target as HTMLInputElement).setSelectionRange(caretPos, caretPos);
    } else {
      leftPart = this.control.value.slice(0, caretPos);
      const value = leftPart + this.mask[leftPart.length] + rightPart;
      this.control.setValue(value);
      (event.target as HTMLInputElement).setSelectionRange(caretPos, caretPos);
    }
  }
}
