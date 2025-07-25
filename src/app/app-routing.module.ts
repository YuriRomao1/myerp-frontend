import { Routes } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { TecnicoComponent } from './components/tecnico/tecnico-list/tecnico.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoUpdateComponent } from './components/tecnico/tecnico-update/tecnico-update.component';
import { TecnicoDeleteComponent } from './components/tecnico/tecnico-delete/tecnico-delete.component';
import { ClienteComponent } from './components/cliente/cliente-list/cliente.component';
import { ClienteCreateComponent } from './components/cliente/cliente-create/cliente-create.component';
import { ClienteUpdateComponent } from './components/cliente/cliente-update/cliente-update.component';
import { ClienteDeleteComponent } from './components/cliente/cliente-delete/cliente-delete.component';
import { ChamadoListComponent } from './components/chamado/chamado-list/chamado-list.component';
import { ChamadoCreateComponent } from './components/chamado/chamado-create/chamado-create.component';
import { ChamadoUpdateComponent } from './components/chamado/chamado-update/chamado-update.component';
import { ChamadoReadComponent } from './components/chamado/chamado-read/chamado-read.component';
import { DespesaListComponent } from './components/despesa/despesa-list/despesa-list.component';
import { DespesaCreateComponent } from './components/despesa/despesa-create/despesa-create.component';
import { DespesaUpdateComponent } from './components/despesa/despesa-update/despesa-update.component';
import { EmpresaListComponent } from './components/empresa/empresa-list/empresa-list.component';
import { EmpresaCreateComponent } from './components/empresa/empresa-create/empresa-create.component';
import { EmpresaUpdateComponent } from './components/empresa/empresa-update/empresa-update.component';
import { EmpresaDeleteComponent } from './components/empresa/empresa-delete/empresa-delete.component';
import { ChamadoEmpresaListComponent } from './components/chamadoEmpresa/chamado-empresa-list/chamado-empresa-list.component';
import { ChamadoEmpresaCreateComponent } from './components/chamadoEmpresa/chamado-empresa-create/chamado-empresa-create.component';
import { ChamadoEmpresaUpdateComponent } from './components/chamadoEmpresa/chamado-empresa-update/chamado-empresa-update.component';
import { ChamadoEmpresaReadComponent } from './components/chamadoEmpresa/chamado-empresa-read/chamado-empresa-read.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {
    path: '', component: NavComponent, canActivate:[AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos',            component: TecnicoComponent       },
      { path: 'tecnicos/create',     component: TecnicoCreateComponent },
      { path: 'tecnicos/update/:id', component: TecnicoUpdateComponent },
      { path: 'tecnicos/delete/:id', component: TecnicoDeleteComponent },

      { path: 'clientes',            component: ClienteComponent       },
      { path: 'clientes/create',     component: ClienteCreateComponent },
      { path: 'clientes/update/:id', component: ClienteUpdateComponent },
      { path: 'clientes/delete/:id', component: ClienteDeleteComponent },

      { path: 'chamados',            component: ChamadoListComponent   },
      { path: 'chamados/create',     component: ChamadoCreateComponent },
      { path: 'chamados/update/:id', component: ChamadoUpdateComponent },
      { path: 'chamados/read/:id',   component: ChamadoReadComponent   },

      { path: 'despesas',            component: DespesaListComponent   },
      { path: 'despesas/create',     component: DespesaCreateComponent },
      { path: 'despesas/update/:id', component: DespesaUpdateComponent },

      { path: 'empresas',             component: EmpresaListComponent    },
      { path: 'empresas/create',      component: EmpresaCreateComponent  },
      { path: 'empresas/update/:id',  component: EmpresaUpdateComponent  },
      { path: 'empresas/delete/:id',  component: EmpresaDeleteComponent  },

      { path: 'chamadosEmpresa',            component: ChamadoEmpresaListComponent    },
      { path: 'chamadosEmpresa/create',     component: ChamadoEmpresaCreateComponent  },
      { path: 'chamadosEmpresa/update/:id', component: ChamadoEmpresaUpdateComponent  },
      { path: 'chamadosEmpresa/read/:id',   component: ChamadoReadComponent            }
  ]
  }
];
export class AppRoutingModule { }
