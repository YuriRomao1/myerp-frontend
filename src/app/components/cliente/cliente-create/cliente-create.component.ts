import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';


@Component({
  selector: 'app-cliente-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatNativeDateModule
  ],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: '',
    perfis: [],
    dataCriacao: '',
  };

  nome:  FormControl = new FormControl(null, Validators.minLength(3));
  cpf:   FormControl = new FormControl(null, Validators.required);
  email: FormControl = new FormControl(null, Validators.email);
  telefone: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(15)]);
  endereco: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(255)]);


  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.cliente).subscribe( () => {
      this.toast.success('Cliente cadastrado com sucesso!', 'Cadastro');
      this.router.navigate(['clientes']);
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

    ngOnInit(): void {
    this.cliente.perfis.push('1');
  }

  addPerfil(perfil: any): void {
    if(this.cliente.perfis.includes(perfil)) {
      this.cliente.perfis.splice(this.cliente.perfis.indexOf(perfil), 1);
    } else {
      this.cliente.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.nome.valid && this.cpf.valid && this.email.valid;
  }
}
