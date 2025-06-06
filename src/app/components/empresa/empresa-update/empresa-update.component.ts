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
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-empresa-update',
  standalone: true,
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
  templateUrl: './empresa-update.component.html',
  styleUrls: ['./empresa-update.component.css']
})
export class EmpresaUpdateComponent {

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
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.empresa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.empresa.id).subscribe(resposta => {
      this.empresa = resposta;
    })
  }

  update(): void {
    this.service.update(this.empresa).subscribe(() => {
      this.toast.success('Empresa atualizada com sucesso!', 'Atualização');
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
