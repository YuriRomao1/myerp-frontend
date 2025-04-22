import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('token');

    if (token) {
      const cloneReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`)});
      console.log('Headers da requisição:', cloneReq.headers.keys());
      return next.handle(cloneReq);
    } else {
    return next.handle(request);
    }
  }
}

export const AuthInterceptorProvider = [
  {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
  }
]
