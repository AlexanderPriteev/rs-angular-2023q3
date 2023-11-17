import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiInterceptorModule } from './api/modules/api-interceptor.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/modules/auth.module';
import { CoreModule } from './core/modules/core.module';
import { FavoriteModule } from './favorite/modules/favorite/favorite.module';
import { AppStoreModule } from './redux/modules/store.module';
import { YoutubeModule } from './youtube/modules/youtube.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppStoreModule,
    ApiInterceptorModule,
    AuthModule,
    YoutubeModule,
    FavoriteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
