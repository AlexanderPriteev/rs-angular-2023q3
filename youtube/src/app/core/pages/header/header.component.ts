import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isSortVisible = false;
  isMainRoute = false;
  currentURL = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    ).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
        this.isMainRoute = event.url === '/';
      }
    });
  }

  toggleSort() {
    this.isSortVisible = !this.isSortVisible;
  }
}
