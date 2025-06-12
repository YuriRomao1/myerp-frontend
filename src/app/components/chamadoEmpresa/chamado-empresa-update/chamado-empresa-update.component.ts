import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-chamado-empresa-update',
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
  templateUrl: './chamado-empresa-update.component.html',
  styleUrls: ['./chamado-empresa-update.component.css']
})
export class ChamadoEmpresaUpdateComponent implements OnInit {

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

  empresas: Empresa[] = [];
  tecnicos: Tecnico[] = [];

  formChamado = new FormGroup({
    prioridade:  new FormControl('', [Validators.required]),
    status:      new FormControl('', [Validators.required]),
    titulo:      new FormControl('', [Validators.required]),
    observacoes: new FormControl('', [Validators.required]),
    tecnicoId:   new FormControl('', [Validators.required]),
    empresaId:   new FormControl('', [Validators.required]),
    valor:       new FormControl(0, [Validators.required, Validators.min(0)]),
    dataVisita:  new FormControl('')  // Campo opcional
  });

  constructor(
    private chamadoEmpresaService: ChamadoEmpresaService,
    private empresaService: EmpresaService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllEmpresas();
    this.findAllTecnicos();
    this.chamadoEmpresa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoEmpresaService.findById(this.chamadoEmpresa.id).subscribe(resposta => {
      this.chamadoEmpresa = resposta;
      this.formChamado.patchValue(resposta);
    });
  }  update(): void {
    const formValues = this.formChamado.value;

    this.chamadoEmpresa = {
      ...this.chamadoEmpresa,
      titulo: formValues.titulo || '',
      status: formValues.status?.toString() || '',
      prioridade: formValues.prioridade || '',
      tecnicoId: formValues.tecnicoId || '',
      empresaId: formValues.empresaId || '',
      observacoes: formValues.observacoes || '',
      valor: Number(formValues.valor) || 0,
      dataVisita: formValues.dataVisita || ''
    };

    this.chamadoEmpresaService.update(this.chamadoEmpresa).subscribe(resposta => {
      this.toastService.success('Chamado atualizado com sucesso!', 'Atualizar chamado');
      this.router.navigate(['chamadosEmpresa']);
    }, error => {
      this.toastService.error(error.error.message, 'Erro ao atualizar chamado');
    });
  }

  findAllEmpresas(): void {
    this.empresaService.findAll().subscribe(resposta => {
      this.empresas = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO';
    } else if(status == '1') {
      return 'EM ANDAMENTO';
    } else {
      return 'ENCERRADO';
    }
  }

  retornaPrioridade(prioridade: any): string {
    const prioridadeStr = String(prioridade).trim().toUpperCase();
    switch(prioridadeStr) {
      case 'BAIXA': return 'BAIXA';
      case 'MEDIA': return 'MÉDIA';
      case 'ALTA': return 'ALTA';
      default: return prioridadeStr;
    }
  }

  validaCampos(): boolean {
    return this.formChamado.valid;
  }
}
