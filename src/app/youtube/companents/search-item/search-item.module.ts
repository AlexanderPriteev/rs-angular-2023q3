import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonComponent } from '../../../shared/companents/button/button.component';
import { SearchItemComponent } from './search-item.component';
import { SearchItemDirective } from './search-item.directive';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchItemDirective,
    ButtonComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchItemComponent,
  ],
})
export class SearchItemModule { }
