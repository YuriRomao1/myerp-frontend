import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoEmpresaService } from 'src/app/services/chamadoEmpresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ChamadoEmpresa } from 'src/app/model/ChamadoEmpresa';
import { Tecnico } from 'src/app/model/tecnico';
import { Empresa } from 'src/app/model/empresa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chamado-empresa-read',
  standalone: true,
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
  templateUrl: './chamado-empresa-read.component.html',
  styleUrls: ['./chamado-empresa-read.component.css']
})
export class ChamadoEmpresaReadComponent implements OnInit {
  chamadoEmpresa: ChamadoEmpresa = {
    prioridade:    '',
    status:        '',
    titulo:        '',
    observacoes:   '',
    tecnicoId:     '',
    empresaId:     '',
    nomeEmpresa:   '',
    nomeTecnico:   '',
    valor:         0,
    dataFechamento:'',
    dataVisita:    ''
  }

  formChamado = new FormGroup({
    prioridade:    new FormControl({ value: '', disabled: true }),
    status:        new FormControl({ value: '', disabled: true }),
    titulo:        new FormControl({ value: '', disabled: true }),
    observacoes:   new FormControl({ value: '', disabled: true }),
    tecnicoId:     new FormControl({ value: '', disabled: true }),
    empresaId:     new FormControl({ value: '', disabled: true }),
    valor:         new FormControl({ value: 0, disabled: true }),
    dataVisita:    new FormControl({ value: '', disabled: true })
  });

  constructor(
    private chamadoEmpresaService: ChamadoEmpresaService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.chamadoEmpresa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoEmpresaService.findById(this.chamadoEmpresa.id).subscribe(resposta => {
      this.chamadoEmpresa = resposta;
      this.formChamado.patchValue(resposta);
    }, error => {
      this.toastService.error(error.error.error);
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
