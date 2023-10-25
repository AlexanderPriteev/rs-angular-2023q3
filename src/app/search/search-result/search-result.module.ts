import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchItemModule } from '../search-item/search-item.module';
import { SearchResultComponent } from './search-result.component';

@NgModule({
  declarations: [
    SearchResultComponent,
  ],
  imports: [
    CommonModule,
    SearchItemModule,
  ],
  exports: [
    SearchResultComponent,
  ],
})
export class SearchResultModule { }
