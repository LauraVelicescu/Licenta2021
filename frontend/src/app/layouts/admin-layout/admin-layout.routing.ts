import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserLayoutComponent} from './submodules/user-module/user-layout/user-layout.component';
import {NgoLayoutComponent} from './submodules/ngo-module/ngo-layout/ngo-layout.component';
import {ApplicationRoutes} from '../../shared/util/ApplicationRoutes';
import {ProjectLayoutComponent} from './submodules/project-module/project-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: ApplicationRoutes.USER_ROUTE, component: UserLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./submodules/user-module/user-layout/user-layout.module').then(m => m.UserLayoutModule)
    }]
  },
  {
    path: ApplicationRoutes.NGO_ROUTE, component: NgoLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./submodules/ngo-module/ngo-layout/ngo-layout.module').then(m => m.NgoLayoutModule)
    }]
  },
  {
    path: ApplicationRoutes.PROJECT_ROUTE, component: ProjectLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./submodules/project-module/project-layout.module').then(m => m.ProjectLayoutModule)
    }]
  },
  {path: ApplicationRoutes.DASHBOARD_ROUTE, component: DashboardComponent},
  // { path: 'icons', component: IconsComponent },
  // { path: "maps", component: MapComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "user", component: UserComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "typography", component: TypographyComponent },
  // { path: "ngo", component: NGOComponent}
];
