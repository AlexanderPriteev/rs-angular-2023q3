import { Routes } from '@angular/router';

import { authGuard } from './auth/guards/auth.guard';
import { userGuard } from './auth/guards/user.guard';
import { SigninComponent } from './auth/pages/signin/signin.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { DialogComponent } from './dialog/page/dialog.component';
import { GroupsComponent } from './groups/page/groups.component';
import { NotFoundComponent } from './not-found/page/not-found.component';
import { ProfileComponent } from './profile/page/profile.component';

export const routes: Routes = [
  { path: '', component: GroupsComponent, canActivate: [authGuard] },
  { path: 'signin', component: SigninComponent, canActivate: [userGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [userGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'groups', component: GroupsComponent, canActivate: [authGuard] },
  { path: 'people/:id', component: DialogComponent, canActivate: [authGuard] },
  { path: 'group/:id', component: DialogComponent, canActivate: [authGuard] },
  { path: '**', component: NotFoundComponent },
];
