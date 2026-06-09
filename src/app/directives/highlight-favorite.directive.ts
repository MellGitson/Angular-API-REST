import { Directive, ElementRef, effect, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlightFavorite]',
  standalone: true,
})
export class HighlightFavoriteDirective {
  appHighlightFavorite = input.required<boolean>();
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  constructor() {
    effect(() => {
      this.el.nativeElement.style.outline = this.appHighlightFavorite() ? '2px solid gold' : 'none';
      this.el.nativeElement.style.outlineOffset = this.appHighlightFavorite() ? '2px' : '0';
    });
  }
}