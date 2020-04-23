import { ClickElsewhereDirective } from './click-elsewhere.directive';
import { ElementRef } from '@angular/core';

describe('ClickElsewhereDirective', () => {
  it('should create an instance', () => {
    let e: ElementRef; 
    const directive = new ClickElsewhereDirective(e);
    expect(directive).toBeTruthy();
  });
});
