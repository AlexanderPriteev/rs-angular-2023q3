import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SortComponent } from './sort.component';

@NgModule({
  declarations: [
    SortComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SortComponent,
  ],
})
export class SortModule { }
