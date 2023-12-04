import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/page/header.component';
import { ThemeToggleService } from './header/services/theme-toggle.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  colorTheme: boolean = false;

  constructor(private themeToggleService: ThemeToggleService) {}

  ngOnInit() {
    this.themeToggleService.isDarkTheme.subscribe((theme) => {
      this.colorTheme = theme;
    });
  }
}
