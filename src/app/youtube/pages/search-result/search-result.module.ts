import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SearchItemModule } from '../../companents/search-item/search-item.module';
import { SearchResultComponent } from './search-result.component';
import { SearchResultPipe } from './search-result.pipe';

@NgModule({
  declarations: [
    SearchResultComponent,
    SearchResultPipe,
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
