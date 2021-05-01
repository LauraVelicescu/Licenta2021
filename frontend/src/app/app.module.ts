import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import {SecurityStorage} from "./security/SecurityStorage";
import { NGOComponent } from './pages/ngo/ngo.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ComponentsModule,
        NgbModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, NGOComponent],
  providers: [SecurityStorage],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
