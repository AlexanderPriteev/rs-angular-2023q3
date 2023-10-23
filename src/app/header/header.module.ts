import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { FilterModule } from './filter/filter.module';
import { SearchModule } from './search/search.module';
import { SortModule } from './sort/sort.module';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    FilterModule,
    SearchModule,
    SortModule,
    UserInfoModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
