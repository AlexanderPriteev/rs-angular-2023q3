import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private localStorageService: LocalStorageService) {}
  ngOnInit() {
    this.localStorageService.initStoreFromLocalStorage();
  }
}
