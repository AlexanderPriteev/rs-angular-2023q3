import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from './companents/header/header.module';
import { AppRoutesModule } from './companents/routes/routes.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';

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
