import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {LoginGuard} from './shared/services/authentication/guards/auth-guard/login.guard';
import {ApplicationRoutes} from './shared/util/ApplicationRoutes';

const routes: Routes = [
  {
    path: ApplicationRoutes.ADMIN_MODULE_ROUTE,
    component: AdminLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        loadChildren:
          () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }
    ]
  }, {
    path: ApplicationRoutes.AUTH_MODULE_ROUTE,
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: ApplicationRoutes.ADMIN_MODULE_ROUTE,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
