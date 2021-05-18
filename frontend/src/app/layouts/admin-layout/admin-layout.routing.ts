import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserLayoutComponent} from './submodules/user-module/user-layout/user-layout.component';
import {NgoLayoutComponent} from './submodules/ngo-module/ngo-layout/ngo-layout.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: 'user', component: UserLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./submodules/user-module/user-layout/user-layout.module').then(m => m.UserLayoutModule)
    }]
  },
  {
    path: 'ngo', component: NgoLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./submodules/ngo-module/ngo-layout/ngo-layout.module').then(m => m.NgoLayoutModule)
    }]
  },
  {path: 'dashboard', component: DashboardComponent},
  // { path: 'icons', component: IconsComponent },
  // { path: "maps", component: MapComponent },
  // { path: "notifications", component: NotificationsComponent },
  // { path: "user", component: UserComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "typography", component: TypographyComponent },
  // { path: "ngo", component: NGOComponent}
];
