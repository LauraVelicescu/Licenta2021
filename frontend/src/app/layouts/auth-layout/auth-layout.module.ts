import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthLayoutRoutes} from './auth-layout.routing';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {LoginComponent} from '../../pages/login/login.component';
import {RegisterComponent} from '../../pages/register/register.component';
import {AppModule} from '../../app.module';
import {ResetPasswordComponent} from "../../pages/resetPassword/resetPassword.component";
import {ForgotPasswordComponent} from "../../pages/forgot-password/forgot-password.component";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AuthLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule
    ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ]
})
export class AuthLayoutModule {
}
