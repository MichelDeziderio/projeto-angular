import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[cpfMask]',
  standalone: true
})
export class CpfMaskDirective {
  constructor(private el: ElementRef<HTMLInputElement>) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');
    if (value.length > 11) value = value.substring(0, 11);

    const formatted = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_match, p1, p2, p3, p4) => {
      return `${p1}.${p2}.${p3}-${p4}`.replace(/[-.]$/, '');
    });

    input.value = formatted;
  }
}