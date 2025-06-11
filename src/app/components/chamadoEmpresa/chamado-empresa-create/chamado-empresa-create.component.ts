import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ChamadoEmpresaService } from 'src/app/services/chamadoEmpresa.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { ChamadoEmpresa } from 'src/app/model/ChamadoEmpresa';
import { Tecnico } from 'src/app/model/tecnico';
import { Empresa } from 'src/app/model/empresa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chamado-empresa-create',
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
  templateUrl: './chamado-empresa-create.component.html',
  styleUrls: ['./chamado-empresa-create.component.css']
})
export class ChamadoEmpresaCreateComponent implements OnInit {

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

  prioridade: FormControl = new FormControl(null, [Validators.required]);
  status:     FormControl = new FormControl(null, [Validators.required]);
  titulo:     FormControl = new FormControl(null, [Validators.required]);
  observacoes:FormControl = new FormControl(null, [Validators.required]);
  tecnico:    FormControl = new FormControl(null, [Validators.required]);
  empresa:    FormControl = new FormControl(null, [Validators.required]);
  valor:      FormControl = new FormControl(null, [Validators.required]);
  dataVisita: FormControl = new FormControl(null);

  constructor(
    private chamadoEmpresaService: ChamadoEmpresaService,
    private empresaService: EmpresaService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllEmpresas();
    this.findAllTecnicos();
  }

  create(): void {
    this.chamadoEmpresaService.create(this.chamadoEmpresa).subscribe(resposta => {
      this.toastService.success('Chamado criado com sucesso!', 'Novo chamado');
      this.router.navigate(['chamadosEmpresa']);
    }, error => {
      this.toastService.error(error.error.message, 'Erro ao criar chamado');
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

  validaCampos(): boolean {
    return this.prioridade.valid && this.status.valid &&
           this.titulo.valid && this.observacoes.valid &&
           this.tecnico.valid && this.empresa.valid &&
           this.valor.valid;
  }
}
