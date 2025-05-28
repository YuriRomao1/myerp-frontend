import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cliente-delete',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './cliente-delete.component.html',
  styleUrl: './cliente-delete.component.css'
})
export class ClienteDeleteComponent {

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

  constructor(
    private service: ClienteService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.cliente.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.cliente.id).subscribe(resposta => {
      resposta.perfis = ['1'];
      this.cliente = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.cliente.id).subscribe(() => {
      this.toast.success('Cliente deletado com sucesso', 'Delete');
      this.router.navigate(['clientes'])
    }, ex => {
      if (ex.error && ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else if (ex.error && ex.error.message) {
        this.toast.error(ex.error.message);
      } else {
        this.toast.error('Cliente possui ordens de serviço e não pode ser deletado!');
      }
    })
  }
}
