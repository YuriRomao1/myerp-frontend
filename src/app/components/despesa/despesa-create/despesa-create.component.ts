import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
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
@Component({
  selector: 'app-despesa-create',
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
    RouterModule
  ],
  templateUrl: './despesa-create.component.html',
  styleUrl: './despesa-create.component.css'
})
export class DespesaCreateComponent {

  despesa: Despesa = {
    descricao:      '',
    valor:           0,
    dataVencimento: '',
    status:         ''
  }

  descricao:      FormControl = new FormControl(null, [Validators.required]);
  valor:          FormControl = new FormControl(null, [Validators.required]);
  dataVencimento: FormControl = new FormControl(null, [Validators.required]);
  dataPagamento:  FormControl = new FormControl(null);
  status:         FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private despesaService: DespesaService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  create(): void {
    if (this.validaCampos()) {
      this.despesaService.create(this.despesa).subscribe(response => {
        this.toast.success("Despesa criada com sucesso!", "Sucesso");
        this.router.navigate(["/despesas"]);
      }, error => {
        this.toast.error(error.error.message, "Erro ao criar despesa");
      });
    }
  }

  validaCampos(): boolean {
    return this.descricao.valid &&
           this.valor.valid &&
           this.dataVencimento.valid &&
           this.status.valid;
  }
}
