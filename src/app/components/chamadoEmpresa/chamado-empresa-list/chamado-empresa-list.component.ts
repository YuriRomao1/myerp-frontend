import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { ChamadoEmpresa } from '../../../model/ChamadoEmpresa';
import { ChamadoEmpresaService } from '../../../services/chamadoEmpresa.service';

@Component({
  selector: 'app-chamado-empresa-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
  ],
  templateUrl: './chamado-empresa-list.component.html',
  styleUrls: ['./chamado-empresa-list.component.css']
})
export class ChamadoEmpresaListComponent implements OnInit {

  ELEMENT_DATA: ChamadoEmpresa[] = [];
  FILTERED_DATA: ChamadoEmpresa[] = [];

  displayedColumns: string[] = ['id', 'titulo', 'empresa', 'tecnico', 'dataAbertura', 'dataVisita','dataFechamento', 'prioridade', 'valor', 'status', 'acoes'];
  dataSource = new MatTableDataSource<ChamadoEmpresa>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private service: ChamadoEmpresaService) { }

  ngOnInit(): void { this.findAll(); }  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta.slice().reverse();
      this.dataSource = new MatTableDataSource<ChamadoEmpresa>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if(status == '0') {
      return 'ABERTO'
    } else if(status == '1') {
      return 'EM ANDAMENTO'
    } else {
      return 'ENCERRADO'
    }
  }  retornaPrioridade(prioridade: any): string {
    // Como já está vindo o valor correto da API, apenas retornamos formatado
    const prioridadeStr = String(prioridade).trim().toUpperCase();
    switch(prioridadeStr) {
      case 'BAIXA': return 'BAIXA';
      case 'MEDIA': return 'MÉDIA';
      case 'ALTA': return 'ALTA';
      default: return prioridadeStr;
    }
  }

  orderByStatus(status: any): void {
    let list: ChamadoEmpresa[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<ChamadoEmpresa>(list);
    this.dataSource.paginator = this.paginator;
  }
}
