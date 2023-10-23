import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResultComponent } from './search-result.component';
import { SearchItemModule } from '../search-item/search-item.module';

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
