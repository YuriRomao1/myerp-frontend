import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  selector: 'app-chamado-update',
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
  templateUrl: './chamado-update.component.html',
  styleUrls: ['./chamado-update.component.css']
})
export class ChamadoUpdateComponent implements OnInit {
  chamado: Chamado = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    observacoes: '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
    valor:       0,
  }

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  formChamado = new FormGroup({
    prioridade:  new FormControl('', [Validators.required]),
    status:      new FormControl('', [Validators.required]),
    titulo:      new FormControl('', [Validators.required]),
    observacoes: new FormControl('', [Validators.required]),
    tecnico:     new FormControl('', [Validators.required]),
    cliente:     new FormControl('', [Validators.required]),
    valor:       new FormControl(0, [Validators.required, Validators.min(0)])
  });

  constructor(
    private chamadoService: ChamadoService,
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAllClientes();
    this.findAllTecnicos();
    this.chamado.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.chamadoService.findById(this.chamado.id).subscribe(resposta => {
      this.chamado = resposta;
      this.formChamado.patchValue(resposta);
    }, error => {
      this.toastService.error(error.error.error);
    })
  }

  update(): void {
    const formValues = this.formChamado.value;

    this.chamado = {
      ...this.chamado,
      titulo: formValues.titulo || '',
      status: formValues.status?.toString() || '',
      prioridade: formValues.prioridade || '',
      tecnico: formValues.tecnico || '',
      cliente: formValues.cliente || '',
      observacoes: formValues.observacoes || '',
      valor: Number(formValues.valor) || 0
    };

    this.chamadoService.update(this.chamado).subscribe(resposta => {
      this.toastService.success('Chamado atualizado com sucesso!', 'Atualizar chamado');
      this.router.navigate(['chamados']);
    }, ex => {
      this.toastService.error(ex.error.error);
    })
  }

  findAllClientes(): void {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    });
  }

  findAllTecnicos(): void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    });
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

  validaCampos(): boolean {
    return this.formChamado.valid;
  }
}
