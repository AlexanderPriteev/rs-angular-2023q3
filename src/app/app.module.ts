import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './shared/pages/header/header.module';
import { SearchResultModule } from './youtube/pages/search-result/search-result.module';
import {NotFoundModule} from "./shared/pages/not-found/not-found.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    SearchResultModule,
    NotFoundModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
