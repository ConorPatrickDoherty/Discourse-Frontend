import { Directive, EventEmitter, ElementRef, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appClickElsewhere]'
})
export class ClickElsewhereDirective {
  @Output() clickElsewhere = new EventEmitter<MouseEvent>(); 
 
  constructor(private elementRef: ElementRef) { }
 
  @HostListener('document:click', ['$event'])
  public onDocumentClick(event: MouseEvent): void {
    const targetElement = event.target as HTMLElement;
    if (targetElement && !this.elementRef.nativeElement.contains(targetElement)) {
        this.clickElsewhere.emit(event);
    }
  }
}