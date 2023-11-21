import { ElementRef, Renderer2 } from '@angular/core';

import { AgeColorDirective } from './age-color.directive';

describe('SearchItemDirective', () => {
  it('should create an instance', () => {
    const elMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new AgeColorDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });
});
