import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/models/auth.module';
import { CoreModule } from './core/modules/core.module';
import { YoutubeModule } from './youtube/modules/youtube.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AuthModule,
    YoutubeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
