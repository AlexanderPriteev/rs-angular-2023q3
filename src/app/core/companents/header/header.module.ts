import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './header.component';
import { LogoComponent } from './logo/logo.component';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { UserInfoComponent } from './user-info/user-info.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchComponent,
    SortComponent,
    UserInfoComponent
  ],
  imports: [
    CommonModule,
    LogoComponent,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
  ],
})
export class HeaderModule { }
