import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { ThemeToggleComponent } from '../components/theme-toggle/theme-toggle.component';
import { LogoComponent } from '../components/logo/logo.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ThemeToggleComponent,
    LogoComponent,
    UserInfoComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
