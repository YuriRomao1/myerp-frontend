import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';



 @Component({
  selector: 'app-nav',
  standalone: true, // Configurado como standalone
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [
    MatSidenavModule, // Para o <mat-drawer-container> e <mat-drawer>
    MatListModule, // Para o <mat-nav-list> e <mat-list-item>
    MatIconModule, // Para os ícones <mat-icon>
    MatButtonModule,
    HeaderComponent,
    RouterOutlet
]
})
export class NavComponent {
  logout() {
    console.log('Logout acionado!');
  }
}
