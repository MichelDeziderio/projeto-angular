import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[phoneMask]',
  standalone: true
})
export class PhoneMaskDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    const formatted = value.length <= 10
      ? value.replace(/(\d{2})(\d{4})(\d{0,4})/, (_m, p1, p2, p3) => `(${p1}) ${p2}-${p3}`.replace(/[-]$/, ''))
      : value.replace(/(\d{2})(\d{5})(\d{0,4})/, (_m, p1, p2, p3) => `(${p1}) ${p2}-${p3}`.replace(/[-]$/, ''));

    input.value = formatted;
  }
}