import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../../auth/pages/login/login.component';
import { ItemPageComponent } from '../../youtube/pages/item-page/item-page.component';
import { SearchResultComponent } from '../../youtube/pages/search-result/search-result.component';
import { authGuard } from '../guards/auth.guard';
import { loginGuard } from '../guards/login.guard';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', component: SearchResultComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard] },
  { path: 'item/:id', component: ItemPageComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent, canActivate: [authGuard] },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }