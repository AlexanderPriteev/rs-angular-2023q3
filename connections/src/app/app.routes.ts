import { Routes } from '@angular/router';

import { SigninComponent } from './auth/pages/signin/signin.component';
import { SignupComponent } from './auth/pages/signup/signup.component';
import { DialogComponent } from './dialog/page/dialog.component';
import { GroupsComponent } from './groups/page/groups.component';
import { NotFoundComponent } from './not-found/page/not-found.component';
import { ProfileComponent } from './profile/page/profile.component';

export const routes: Routes = [
  { path: '', component: GroupsComponent },
  { path: 'login', component: SigninComponent, },
  { path: 'registration', component: SignupComponent, },
  { path: 'profile', component: ProfileComponent, },
  { path: 'groups', component: GroupsComponent },
  { path: 'item', component: DialogComponent },
  { path: '**', component: NotFoundComponent },
];
