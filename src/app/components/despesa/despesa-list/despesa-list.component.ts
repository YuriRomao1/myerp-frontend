import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DespesaService } from 'src/app/services/despesa.service';
import { Despesa } from 'src/app/model/despesa'; // Certifique-se de definir seu modelo de despesa


@Component({
  selector: 'app-despesa-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './despesa-list.component.html',
  styleUrl: './despesa-list.component.css'
})
export class DespesaListComponent {

  ELEMENT_DATA: Despesa[] = [];

  dataSource = new MatTableDataSource<Despesa>(this.ELEMENT_DATA);
  displayedColumns: string[] = ['id', 'descricao', 'valor', 'dataVencimento', 'status', 'acoes'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private despesaService: DespesaService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.despesaService.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Despesa>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  retornaStatus(status: any): string {
    if(status === 'PENDENTE') {
      return 'Pendente';
    } else if(status === 'PAGO') {
      return 'Pago';
    } else if(status === 'ATRASADO') {
      return 'Atrasado';
    }
    return status;
  }
}
