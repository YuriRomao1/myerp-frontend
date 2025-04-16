import { RouterModule, Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: NavComponent, children:[
    {path: 'home', component: HomeComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

