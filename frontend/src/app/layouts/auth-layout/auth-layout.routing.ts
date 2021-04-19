import {Routes} from '@angular/router';

import {LoginComponent} from '../../pages/login/login.component';
import {RegisterComponent} from '../../pages/register/register.component';
import {AuthLayoutComponent} from './auth-layout.component';
import {ResetPasswordComponent} from '../../pages/resetPassword/resetPassword.component';
import {ForgotPasswordComponent} from '../../pages/forgot-password/forgot-password.component';


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
    path: 'changePassword', component: ResetPasswordComponent
  },
  {
    path: 'forgotPassword', component: ForgotPasswordComponent
  },
  {
    path: '**', redirectTo: '/adm/dashboard'
  }

];
