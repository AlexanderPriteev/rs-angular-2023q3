import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from '../pages/header/header.component';
import { LogoComponent } from '../companents/logo/logo.component';
import { SearchComponent } from '../companents/search/search.component';
import { SortComponent } from '../companents/sort/sort.component';
import { UserInfoComponent } from '../companents/user-info/user-info.component';

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
