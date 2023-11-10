import { Component } from '@angular/core';

@Component({
  selector: 'app-alert-button',
  template: `
    <button type="button" class="btn btn--alert">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonAlertComponent {

}
