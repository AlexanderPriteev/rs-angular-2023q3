import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoriteComponent} from "../../pages/favorite/favorite.component";
import {YoutubeModule} from "../../../youtube/modules/youtube.module";



@NgModule({
  declarations: [FavoriteComponent],
  imports: [
    CommonModule,
    YoutubeModule
  ]
})
export class FavoriteModule { }
