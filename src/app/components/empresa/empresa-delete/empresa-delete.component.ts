import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { EmpresaService } from 'src/app/services/empresa.service';
import { Empresa } from 'src/app/model/empresa';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empresa-delete',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './empresa-delete.component.html',
  styleUrls: ['./empresa-delete.component.css']
})
export class EmpresaDeleteComponent implements OnInit {
  empresa: Empresa = {
    id: '',
    razaoSocial: '',
    nomeFantasia: '',
    cnpj: '',
    email: '',
    telefone: '',
    dataCriacao: ''
  }

  constructor(
    private service: EmpresaService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.empresa.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.empresa.id).subscribe(resposta => {
      this.empresa = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.empresa.id).subscribe(() => {
      this.toast.success('Empresa deletada com sucesso!', 'Delete');
      this.router.navigate(['empresas']);
    }, ex => {
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
}
