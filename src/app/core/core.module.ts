import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './companents/header/header.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports: [
    HeaderModule,
    NotFoundComponent
  ]
})
export class CoreModule { }
