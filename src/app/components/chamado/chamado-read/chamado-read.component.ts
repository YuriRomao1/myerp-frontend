import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoService } from 'src/app/services/chamado.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Chamado } from 'src/app/model/chamado';
import { Tecnico } from 'src/app/model/tecnico';
import { Cliente } from 'src/app/model/cliente';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chamado-read',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './chamado-read.component.html',
  styleUrls: ['./chamado-read.component.css']
})
export class ChamadoReadComponent implements OnInit {
  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
    valor:       0
  }

  formChamado = new FormGroup({
    prioridade:  new FormControl({ value: '', disabled: true }),
    status:      new FormControl({ value: '', disabled: true }),
    titulo:      new FormControl({ value: '', disabled: true }),
    observacoes: new FormControl({ value: '', disabled: true }),
    tecnico:     new FormControl({ value: '', disabled: true }),
    cliente:     new FormControl({ value: '', disabled: true }),
    valor:       new FormControl({ value: 0, disabled: true })
  });

  constructor(
    private chamadoService: ChamadoService,
    private toastService:    ToastrService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.formChamado.patchValue(resposta);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  retornaStatus(status: string): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }

  retornaPrioridade(prioridade: string): string {
    if(prioridade == '0') {
      return 'BAIXA'
    } else if(prioridade == '1') {
      return 'MÉDIA'
    } else {
      return 'ALTA'
    }
  }
}
