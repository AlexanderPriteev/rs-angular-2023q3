import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { HeaderModule } from './header.module';
import { AppRoutesModule } from './routes.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    AppRoutesModule
  ],
  exports: [
    AppRoutesModule,
    HeaderModule,
    NotFoundComponent
  ]
})
export class CoreModule { }
