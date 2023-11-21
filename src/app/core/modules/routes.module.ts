import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../auth/pages/login/login.component';
import { FavoriteComponent } from '../../favorite/pages/favorite/favorite.component';
import { CreateCardComponent } from '../../youtube/pages/create-card/create-card.component';
import { ItemPageComponent } from '../../youtube/pages/item-page/item-page.component';
import { SearchResultComponent } from '../../youtube/pages/search-result/search-result.component';
import { authGuard } from '../guards/auth.guard';
import { loginGuard } from '../guards/login.guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', component: SearchResultComponent },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'create', component: CreateCardComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
