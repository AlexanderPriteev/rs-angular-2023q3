import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { YoutubeModule } from '../../../youtube/modules/youtube.module';
import { FavoriteComponent } from '../../pages/favorite/favorite.component';

@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    YoutubeModule
  ]
})
export class FavoriteModule { }
