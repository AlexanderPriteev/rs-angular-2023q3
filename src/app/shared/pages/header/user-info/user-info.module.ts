import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserInfoComponent } from './user-info.component';

@NgModule({
  declarations: [
    UserInfoComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    UserInfoComponent,
  ],
})
export class UserInfoModule { }
