import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tecnico-update',
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
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent {
  formTecnico: FormGroup;

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    endereco: '',
    dataNascimento: '',
    email: '',
    senha: '',
    dataCriacao: '',
    perfis: []
  }

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.formTecnico = this.formBuilder.group({
      nome:           ['', [Validators.required, Validators.minLength(3)]],
      cpf:            ['', [Validators.required]],
      telefone:       ['', [Validators.required]],
      endereco:       ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email:          ['', [Validators.required, Validators.email]],
      senha:          ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }
  findById(): void {
  this.service.findById(this.tecnico.id).subscribe(resposta => {
    this.tecnico = {
      ...resposta,
      perfis: resposta.perfis.map((perfil: any) => {
        if (typeof perfil === 'string') {
          const parsed = parseInt(perfil, 10);
          return isNaN(parsed) ? -1 : parsed;
        }
        return perfil;
      }).filter(p => p !== -1)
    };

    this.formTecnico.patchValue({
      nome: this.tecnico.nome,
      cpf: this.tecnico.cpf,
      telefone: this.tecnico.telefone,
      endereco: this.tecnico.endereco,
      dataNascimento: this.tecnico.dataNascimento,
      email: this.tecnico.email,
      senha: this.tecnico.senha
    });
  });
}

  update(): void {
  if (this.formTecnico.valid) {
    const formValues = this.formTecnico.value;
    const tecnicoAtualizado: Tecnico = {
      ...this.tecnico,
      ...formValues,
      perfis: this.tecnico.perfis.map(p => typeof p === 'string' ? parseInt(p, 10) : p)
    };

    this.service.update(tecnicoAtualizado).subscribe({
      next: () => {
        this.toast.success('Técnico atualizado com sucesso!', 'Update');
        this.router.navigate(['tecnicos']);
      },
      error: (ex) => {
        if (ex.status === 403) {
          this.toast.error('Você não tem permissão para atualizar este técnico.', 'Erro de Permissão');
        } else if (ex.error?.errors && Array.isArray(ex.error.errors)) {
          ex.error.errors.forEach(element => {
            this.toast.error(element.message);
          });
        } else if (ex.error?.message) {
          this.toast.error(ex.error.message);
        } else {
          this.toast.error('Erro ao atualizar técnico. Por favor, tente novamente.');
        }
      }
    });
  }
}

  addPerfil(perfil: number): void {
    if (this.tecnico.perfis.map(p => typeof p === 'string' ? parseInt(p, 10) : p).includes(perfil)) {
        this.tecnico.perfis = this.tecnico.perfis.filter(p => (typeof p === 'string' ? parseInt(p, 10) : p) !== perfil);
    } else {
        this.tecnico.perfis.push(perfil.toString());
    }
  }

  validaCampos(): boolean {
    return this.formTecnico.valid;
  }
}
