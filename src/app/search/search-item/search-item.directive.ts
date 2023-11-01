import {
  AfterViewInit,
  Directive, ElementRef, Input, Renderer2
} from '@angular/core';

@Directive({
  selector: '[appAgeColor]'
})
export class SearchItemDirective implements AfterViewInit {
  @Input() createdDate: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const addClass = (str: string) => this.renderer.addClass(this.el.nativeElement, str);
    const currentDate = new Date().getTime();
    const itemDate = new Date(this.createdDate).getTime();
    const timeDifferenceInDays = (currentDate - itemDate) / (1000 * 3600 * 24);

    if (timeDifferenceInDays > 180) {
      addClass('search-item--older');
    } else if (timeDifferenceInDays >= 30 && timeDifferenceInDays <= 180) {
      addClass('search-item--old');
    } else if (timeDifferenceInDays >= 7 && timeDifferenceInDays < 30) {
      addClass('search-item--normal');
    }
  }
}
