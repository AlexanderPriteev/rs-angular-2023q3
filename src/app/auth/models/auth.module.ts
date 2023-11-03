import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '../../shared/modules/button.module';
import { LoginComponent } from '../pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
