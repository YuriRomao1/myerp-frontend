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
  ],
}).catch(err => console.error(err));
