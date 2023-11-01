import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from '../../../shared/companents/button/button.module';
import { SearchItemComponent } from './search-item.component';
import { SearchItemDirective } from './search-item.directive';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchItemDirective,
  ],
  imports: [
    CommonModule,
    ButtonModule
  ],
  exports: [
    SearchItemComponent,
  ],
})
export class SearchItemModule { }
