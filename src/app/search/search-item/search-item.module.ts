import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchItemComponent } from './search-item.component';
import { SearchItemDirective } from './search-item.directive';

@NgModule({
  declarations: [
    SearchItemComponent,
    SearchItemDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchItemComponent,
  ],
})
export class SearchItemModule { }
