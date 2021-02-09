import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { UserDetailsListComponent } from './user-details-list/user-details-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GuardService } from './_services/guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/id:', // will need to add the id param later
    component: UserProfileComponent,
    canActivate: [GuardService]
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [GuardService]
  },
  {
    path: 'profile/user',
    component: UserProfileComponent,
    canActivate: [GuardService]
  },
  {
    path: 'users',
    component: UserDetailsListComponent,
    canActivate: [GuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [GuardService]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
