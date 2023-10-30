import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { SearchComponent } from './search.component';

@NgModule({
  declarations: [
    SearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SearchComponent,
  ],
})
export class SearchModule { }
