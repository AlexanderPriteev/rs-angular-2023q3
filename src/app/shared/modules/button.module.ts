import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '../companents/button/button.component';
import { ButtonAlertComponent } from '../companents/button/button-alert.component';

@NgModule({
  declarations: [
    ButtonComponent,
    ButtonAlertComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ButtonComponent,
    ButtonAlertComponent
  ]
})
export class ButtonModule { }
