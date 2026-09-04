import { Directive, ElementRef, EventEmitter, HostListener, Output, inject } from '@angular/core';

@Directive({
  selector: 'input[appNumbersOnlyDirective]',
})
export class NumbersOnlyDirective {
  @Output() valueChange = new EventEmitter();

  private elementRef = inject(ElementRef);

  @HostListener('input', ['$event']) onInputChange(event: Event) {
    const initalValue = this.elementRef.nativeElement.value;
    const newValue = initalValue.replace(/[^0-9]*/g, '');
    this.elementRef.nativeElement.value = newValue;
    this.valueChange.emit(newValue);
    if (initalValue !== this.elementRef.nativeElement.value) {
      event.stopPropagation();
    }
  }
}
