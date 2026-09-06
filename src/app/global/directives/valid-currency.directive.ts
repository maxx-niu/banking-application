import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Directive({
  selector: 'input[appValidCurrencyDirective]',
})
export class ValidCurrencyDirective {
  @Output() valueChange = new EventEmitter();

  private elementRef = inject(ElementRef);

  private formatValue(value: string): string {
    // Get rid of everything that's not a digit and a dot
    let cleaned = value.replace(/[^0-9.]/g, '');

    // Only allow the first "." typed, by keeping everything up to and including
    // the first dot, and then stripping away additional dots after it
    const firstDotIndex = cleaned.indexOf('.');
    if (firstDotIndex !== -1) {
      cleaned =
        cleaned.slice(0, firstDotIndex + 1) + cleaned.slice(firstDotIndex + 1).replace(/\./g, '');
    }

    const [intPart, decimalPart] = cleaned.split('.');

    // Strip leading 0's in the integer part
    const trimmedIntPart = intPart.replace(/^0+(?=\d)/, '');

    // Whole cents only: at most 2 digits after the decimal point
    return decimalPart === undefined
      ? trimmedIntPart
      : `${trimmedIntPart}.${decimalPart.slice(0, 2)}`;
  }

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this.elementRef.nativeElement.value;
    const newValue = this.formatValue(initalValue);
    this.elementRef.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
