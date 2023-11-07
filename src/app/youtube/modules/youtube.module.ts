import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ButtonModule } from '../../shared/modules/button.module';
import { SearchItemComponent } from '../companents/search-item/search-item.component';
import { AgeColorDirective } from '../directives/age-color.directive';
import { ItemPageComponent } from '../pages/item-page/item-page.component';
import { SearchResultComponent } from '../pages/search-result/search-result.component';
import { SearchFilterPipe } from '../pipes/search-filter.pipe';

@NgModule({
  declarations: [
    ItemPageComponent,
    SearchItemComponent,
    SearchResultComponent,
    SearchFilterPipe,
    AgeColorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ButtonModule
  ]
})
export class YoutubeModule { }
