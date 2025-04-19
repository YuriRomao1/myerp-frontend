import {AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Tecnico } from 'src/app/model/tecnico';

@Component({
  selector: 'app-tecnico',
  templateUrl: './tecnico.component.html',
  styleUrl: './tecnico.component.css',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
})
export class TecnicoComponent {
ELEMENT_DATA: Tecnico[] = [
  {
    id: 1,
    nome: 'Yuri Romao',
    cpf: '123.456789-10',
    email: 'Yuri@email.com',
    telefone: '1234',
    senha: '1234',
    perfil: ['0'],
    acoes: 'Ações',
    dataCriacao: '19/04/2025',
  }
]


  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  constructor() {
  }

  ngOnInit() { }


  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

