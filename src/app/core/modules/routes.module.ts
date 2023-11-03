import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';

import { LoginComponent } from '../../auth/pages/login/login.component';
import { ItemPageComponent } from '../../youtube/pages/item-page/item-page.component';
import { SearchResultComponent } from '../../youtube/pages/search-result/search-result.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';

export const appRoutes: Routes = [
  { path: '', component: SearchResultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'item/:id', component: ItemPageComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutesModule { }
