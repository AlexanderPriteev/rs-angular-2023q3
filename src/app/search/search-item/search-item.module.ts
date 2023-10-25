import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchItemComponent } from './search-item.component';

@NgModule({
  declarations: [
    SearchItemComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SearchItemComponent,
  ],
})
export class SearchItemModule { }
