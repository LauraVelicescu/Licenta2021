import {Routes} from '@angular/router';

import {LoginComponent} from '../../pages/login/login.component';
import {RegisterComponent} from '../../pages/register/register.component';
import {AuthLayoutComponent} from './auth-layout.component';


export const AuthLayoutRoutes: Routes = [
  {
    path:'', component: AuthLayoutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: '**', redirectTo: '/adm/dashboard'
  }

];
