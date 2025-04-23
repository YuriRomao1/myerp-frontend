import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/model/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-tecnico-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfil: [],
    dataCriacao: '',
    acoes: '',
    telefone: ''
  };

  nome: FormControl =      new FormControl(null, Validators.minLength(3));
  cpf: FormControl =       new FormControl(null, Validators.required);
  email: FormControl =     new FormControl(null, Validators.email);
  senha: FormControl =     new FormControl(null, Validators.minLength(3));

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.tecnico).subscribe( () => {
      this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['tecnicos']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach( element => {
          this.toast.error(element.message);
        });
      } else  {
        this.toast.error(ex.error.message);
      }
    })
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfil.includes(perfil)) {
      this.tecnico.perfil.splice(this.tecnico.perfil.indexOf(perfil), 1);
    } else {
      this.tecnico.perfil.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid && this.senha.valid;
  }
}
