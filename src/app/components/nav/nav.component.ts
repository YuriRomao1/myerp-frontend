import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    RouterOutlet,
    RouterModule
]
})
export class NavComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) {}

  ngOnInit() {
    this.router.navigate(['chamados']);
  }

  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info('Logout realizado com sucesso!', 'Logout', {  timeOut: 7000 });
  }
}
