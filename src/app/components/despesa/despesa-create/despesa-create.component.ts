import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from 'src/app/services/despesa.service';
import { Despesa } from 'src/app/model/despesa';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-despesa-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    MatRadioModule
  ],
  templateUrl: './despesa-create.component.html',
  styleUrls: ['./despesa-create.component.css'],
  providers: [DatePipe]
})
export class DespesaCreateComponent implements OnInit {

  despesaForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private despesaService: DespesaService,
    private toast: ToastrService,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.despesaForm = this.fb.group({
      descricao:      ['', Validators.required],
      valor:          [null, [Validators.required, Validators.min(0.01)]],
      dataVencimento: [null, Validators.required],
      status:         ['', Validators.required]
    });
  }

  create(): void {
    if (this.despesaForm.invalid) {
      this.despesaForm.markAllAsTouched();
      return;
    }
    const { descricao, valor, dataVencimento, status } = this.despesaForm.value;
    const dataFormatada = this.datePipe.transform(dataVencimento, 'dd/MM/yyyy');
    const payload: Despesa = {
      descricao,
      valor,
      dataVencimento: dataFormatada ?? '',
      status
    };

    this.despesaService.create(payload).subscribe(
      () => {
        this.toast.success('Despesa criada com sucesso!', 'Sucesso');
        this.router.navigate(['/despesas']);
      },
      err => {
        const msg = err.error?.message ?? err.message;
        this.toast.error(msg, 'Erro ao criar despesa');
      }
    );
  }
}
