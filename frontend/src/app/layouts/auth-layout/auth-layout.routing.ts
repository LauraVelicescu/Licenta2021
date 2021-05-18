import {Routes} from '@angular/router';

import {LoginComponent} from '../../pages/login/login.component';
import {RegisterComponent} from '../../pages/register/register.component';
import {AuthLayoutComponent} from './auth-layout.component';
import {ResetPasswordComponent} from '../../pages/resetPassword/resetPassword.component';
import {ForgotPasswordComponent} from '../../pages/forgot-password/forgot-password.component';
import {ApplicationRoutes} from '../../shared/util/ApplicationRoutes';


export const AuthLayoutRoutes: Routes = [
  {
    path:'', component: AuthLayoutComponent
  },
  {
    path: ApplicationRoutes.LOGIN_ROUTE, component: LoginComponent
  },
  {
    path: ApplicationRoutes.REGISTER_ROUTE, component: RegisterComponent
  },
  {
    path: ApplicationRoutes.CHANGE_PASSWORD_ROUTE, component: ResetPasswordComponent
  },
  {
    path: ApplicationRoutes.FORGOT_PASSWORD_ROUTE, component: ForgotPasswordComponent
  },
  {
    path: '**', redirectTo: '/adm/dashboard'
  }

];
