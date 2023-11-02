import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ItemPageComponent } from './pages/item-page/item-page.component';
import { SearchResultModule } from './pages/search-result/search-result.module';

@NgModule({
  declarations: [
    ItemPageComponent
  ],
  imports: [
    CommonModule,
    SearchResultModule
  ],
  exports: [
    ItemPageComponent,
    SearchResultModule
  ]
})
export class YoutubeModule { }
