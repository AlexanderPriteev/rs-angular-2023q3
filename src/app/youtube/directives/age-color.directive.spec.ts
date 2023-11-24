import { ElementRef, Renderer2 } from '@angular/core';

import { AgeColorDirective } from './age-color.directive';

describe('SearchItemDirective', () => {
  it('should create an instance', () => {
    const elMock = {} as ElementRef;
    const rendererMock = {} as Renderer2;
    const directive = new AgeColorDirective(elMock, rendererMock);
    expect(directive).toBeTruthy();
  });

  describe('date class', () => {
    let elMock: ElementRef;
    let rendererMock: Renderer2;
    let directive: AgeColorDirective;
    let currentDate: Date;

    beforeEach(() => {
      elMock = {} as ElementRef;
      rendererMock = {
        addClass: jest.fn(),
      } as unknown as Renderer2;
      directive = new AgeColorDirective(elMock, rendererMock);
      currentDate = new Date();
    });
    it('should add --older', () => {
      currentDate.setDate(currentDate.getDate() - 181);
      directive.createdDate = String(currentDate);
      directive.ngAfterViewInit();
      expect(rendererMock.addClass).toHaveBeenCalledWith(elMock.nativeElement, '--older');
    });
    it('should add --old', () => {
      currentDate.setDate(currentDate.getDate() - 30);
      directive.createdDate = String(currentDate);
      directive.ngAfterViewInit();
      expect(rendererMock.addClass).toHaveBeenCalledWith(elMock.nativeElement, '--old');
    });
    it('should add --normal', () => {
      currentDate.setDate(currentDate.getDate() - 7);
      directive.createdDate = String(currentDate);
      directive.ngAfterViewInit();
      expect(rendererMock.addClass).toHaveBeenCalledWith(elMock.nativeElement, '--normal');
    });
  });
});
