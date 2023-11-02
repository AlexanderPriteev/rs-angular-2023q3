import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logo">
      <img src="../../../../../assets/images/png/logo.png" alt="logo" class="logo__img">
    </div>
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

}
