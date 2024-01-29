import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ThemeToggleService } from '../../services/theme-toggle.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `<i class="theme-toggle"
                [ngClass]="{'theme-toggle__dark': colorTheme}"
                (click)="toggleTheme()"></i>`,
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit {
  colorTheme: boolean = false;

  constructor(private themeToggleService: ThemeToggleService) {}

  ngOnInit() {
    this.themeToggleService.isDarkTheme.subscribe((theme) => {
      this.colorTheme = theme;
    });
  }
  toggleTheme() {
    this.themeToggleService.toggleTheme();
  }
}
