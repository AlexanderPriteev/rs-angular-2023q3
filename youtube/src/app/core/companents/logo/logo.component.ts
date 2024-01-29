import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
      <a [routerLink]="['/']" class="logo">
          <img src="assets/images/png/logo.png" alt="logo" class="logo__img">
      </a>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

}
