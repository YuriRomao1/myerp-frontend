import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let authenticate = this.authService.isAuthenticated();

    if (authenticate) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }

  isAuthenticated() {
    throw new Error('Method not implemented.');
  }
}
