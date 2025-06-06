import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/model/empresa';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empresa-create',
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
  templateUrl: './empresa-create.component.html',
  styleUrls: ['./empresa-create.component.css']
})
export class EmpresaCreateComponent {

  empresa: Empresa = {
    id: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
    telefone: '',
    dataCriacao: ''
  };

  razaoSocial: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
  nomeFantasia: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(100)]);
  cnpj: FormControl = new FormControl(null, [Validators.required, Validators.maxLength(14)]);
  email: FormControl = new FormControl(null, [Validators.required, Validators.email, Validators.maxLength(100)]);
  telefone: FormControl = new FormControl(null, [Validators.maxLength(20)]);

  constructor(
    private service: EmpresaService,
    private toast: ToastrService,
    private router: Router
  ) { }

  create(): void {
    this.service.create(this.empresa).subscribe(() => {
      this.toast.success('Empresa cadastrada com sucesso!', 'Cadastro');
      this.router.navigate(['empresas']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }

  validaCampos(): boolean {
    return this.razaoSocial.valid && this.cnpj.valid &&
           this.nomeFantasia.valid && this.email.valid;
  }
}
