import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FilterComponent } from './filter.component';

@NgModule({
  declarations: [
    FilterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    FilterComponent,
  ],
})
export class FilterModule { }
