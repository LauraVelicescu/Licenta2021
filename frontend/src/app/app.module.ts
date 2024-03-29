import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {SecurityStorage} from './security/SecurityStorage';
import {NotifierModule, NotifierOptions} from 'angular-notifier';
import {MatNativeDateModule} from '@angular/material/core';
import { LoadingComponent } from './shared/components/loading/loading.component';
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';

const notifierDefaultOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12,
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10,
    },
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: false,
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4,
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 300,
      easing: 'ease',
    },
    hide: {
      preset: 'fade',
      speed: 300,
      easing: 'ease',
      offset: 50,
    },
    shift: {
      speed: 300,
      easing: 'ease',
    },
    overlap: 150,
  },
};

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    NotifierModule.withConfig(notifierDefaultOptions),
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoadingComponent],
  providers: [SecurityStorage,
    {
      provide:MatDialogRef,
      useValue: {}
    }],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
