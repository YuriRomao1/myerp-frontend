import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';
import { TecnicoComponent } from './components/tecnico/tecnico.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {
    path: '', component: NavComponent, children: [
      { path: 'home', component: HomeComponent },
      { path: 'tecnicos', component: TecnicoComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

