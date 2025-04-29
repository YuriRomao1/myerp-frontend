import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from 'src/app/services/despesa.service';
import { Despesa } from 'src/app/model/despesa';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-despesa-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatCheckboxModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule
  ],
  templateUrl: './despesa-list.component.html',
  styleUrls: ['./despesa-list.component.css']
})
export class DespesaListComponent implements OnInit {
  ELEMENT_DATA: Despesa[] = [];
  dataSource = new MatTableDataSource<Despesa>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'descricao', 'valor', 'dataVencimento', 'status', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private service: DespesaService) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Despesa>(resposta);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: string): string {
    if (status === 'PENDENTE') {
      return 'PENDENTE';
    } else if (status === 'PAGO') {
      return 'PAGO';
    } else if (status === 'ATRASADO'){
      return 'ATRASADO';
    } else {
      return 'DESCONHECIDO';
    }
  }

  orderByStatus(status: string): void {
    const list = this.ELEMENT_DATA.filter(element => element.status === status);
    this.dataSource = new MatTableDataSource<Despesa>(list);
    this.dataSource.paginator = this.paginator;
  }
}
