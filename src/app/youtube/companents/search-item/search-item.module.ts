import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
    ButtonModule,
    RouterModule
  ],
  exports: [
    SearchItemComponent,
  ],
})
export class SearchItemModule { }
