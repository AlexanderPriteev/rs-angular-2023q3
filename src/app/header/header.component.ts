import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isSortVisible: boolean = false;

  toggleSort() {
    this.isSortVisible = !this.isSortVisible;
  }
}
