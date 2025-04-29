import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { AuthInterceptorProvider } from './app/interceptors/auth.interceptor';
import { withInterceptorsFromDi } from '@angular/common/http';
import { provideNgxMask } from 'ngx-mask';
import { LOCALE_ID } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    AuthInterceptorProvider,
    provideToastr({
      timeOut: 4000,
      closeButton: true,
      progressBar: true
    }),
    provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
}).catch(err => console.error(err));
