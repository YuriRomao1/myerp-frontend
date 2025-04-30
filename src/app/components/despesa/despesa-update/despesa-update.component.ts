import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from 'src/app/services/despesa.service';
import { Despesa } from 'src/app/model/despesa';

@Component({
  selector: 'app-despesa-update',
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
  templateUrl: './despesa-update.component.html',
  styleUrls: ['./despesa-update.component.css'],
  providers: [DatePipe]
})
export class DespesaUpdateComponent implements OnInit {
  despesaForm!: FormGroup;
  despesaId!: string;

  constructor(
    private fb: FormBuilder,
    private despesaService: DespesaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.despesaForm = this.fb.group({
      descricao: ['', Validators.required],
      valor: [null, [Validators.required, Validators.min(0.01)]],
      dataVencimento: [null, Validators.required],
      status: ['', Validators.required]
    });

    // Pega o ID da despesa via parâmetro de rota
    this.despesaId = this.route.snapshot.paramMap.get('id') || '';
    if (this.despesaId) {
      this.despesaService.findById(this.despesaId).subscribe(resp => {
        // Se o backend retorna a data no formato "dd/MM/yyyy", converte para objeto Date
        const date = this.convertStringToDate(resp.dataVencimento);
        // Preenche o formulário com os dados retornados
        this.despesaForm.patchValue({
          descricao: resp.descricao,
          valor: resp.valor,
          dataVencimento: date,
          status: resp.status
        });
      });
    }
  }

  update(): void {
    if (this.despesaForm.invalid) {
      this.despesaForm.markAllAsTouched();
      return;
    }
    const { descricao, valor, dataVencimento, status } = this.despesaForm.value;
    // Formata a data para "dd/MM/yyyy" antes de enviar
    const dataFormatada = this.datePipe.transform(dataVencimento, 'dd/MM/yyyy');
    const payload: Despesa = {
      id: this.despesaId,
      descricao,
      valor,
      dataVencimento: dataFormatada ?? '',
      status
    };

    // Chama o método update do serviço
    this.despesaService.update(payload).subscribe(
      () => {
        this.toast.success('Despesa atualizada com sucesso!', 'Sucesso');
        this.router.navigate(['/despesas']);
      },
      err => {
        const msg = err.error?.message ?? err.message;
        this.toast.error(msg, 'Erro ao atualizar despesa');
      }
    );
  }

  private convertStringToDate(dateString: string): Date {
    // Supõe que a data venha no formato "dd/MM/yyyy"
    const parts = dateString.split('/');
    const day = +parts[0];
    const month = +parts[1] - 1;
    const year = +parts[2];
    return new Date(year, month, day);
  }
}
