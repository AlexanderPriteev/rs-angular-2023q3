import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { SearchModule } from './search/search.module';
import { SortModule } from './sort/sort.module';
import { UserInfoModule } from './user-info/user-info.module';

@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    SearchModule,
    SortModule,
    UserInfoModule,
    LogoComponent
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
