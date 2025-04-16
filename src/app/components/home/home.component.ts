import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true, // Configurado como standalone
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [MatCardModule] // Importação do MatCardModule
})
export class HomeComponent { }
