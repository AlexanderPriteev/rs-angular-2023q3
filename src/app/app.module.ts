import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './auth/pages/login/login.module';
import { HeaderModule } from './shared/pages/header/header.module';
import { NotFoundModule } from './shared/pages/not-found/not-found.module';
import { ItemPageModule } from './youtube/pages/item-page/item-page.module';
import { SearchResultModule } from './youtube/pages/search-result/search-result.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    SearchResultModule,
    NotFoundModule,
    LoginModule,
    ItemPageModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
