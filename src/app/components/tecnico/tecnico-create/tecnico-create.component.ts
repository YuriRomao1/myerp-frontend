import { Component, LOCALE_ID } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/model/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-create',
  standalone: true,
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css'],
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class TecnicoCreateComponent {
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
    perfis: [],
    dataCriacao: ''
  }

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.formTecnico = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      endereco: ['', [Validators.required]],
      dataNascimento: [null, [Validators.required]],  // <-- Certifique que é null aqui
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  create(): void {
    if (this.formTecnico.valid) {
      const formValues = this.formTecnico.value;

      // Converte a string de data para objeto Date
      const dataNascimento = this.converterDataParaDate(formValues.dataNascimento);

      this.tecnico = {
        ...this.tecnico,
        ...formValues,
        dataNascimento: this.formatarDataParaBanco(dataNascimento)
      };

      this.service.create(this.tecnico).subscribe({
        next: () => {
          this.toast.success('Técnico cadastrado com sucesso!', 'Cadastro');
          this.router.navigate(['tecnicos']);
        },
        error: (ex) => {
          if (ex.error?.errors) {
            ex.error.errors.forEach((error: any) => {
              this.toast.error(error.message);
            });
          } else {
            this.toast.error('Erro ao cadastrar técnico');
          }
        }
      });
    }
  }

  addPerfil(perfil: any): void {
    if(this.tecnico.perfis.includes(perfil)) {
      this.tecnico.perfis.splice(this.tecnico.perfis.indexOf(perfil), 1);
    } else {
      this.tecnico.perfis.push(perfil);
    }
  }

  validaCampos(): boolean {
    return this.formTecnico.valid;
  }

  private converterDataParaDate(dataString: string): Date {
    if (!dataString) return new Date();

    const [dia, mes, ano] = dataString.split('/');
    return new Date(+ano, +mes - 1, +dia);
  }

  private formatarDataParaBanco(data: Date): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy') || '';
  }
}
