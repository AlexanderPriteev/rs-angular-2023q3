import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ItemPageComponent } from './item-page.component';

@NgModule({
  declarations: [
    ItemPageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ItemPageComponent
  ]
})
export class ItemPageModule { }
