import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Tecnico } from 'src/app/model/tecnico';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tecnico-delete',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './tecnico-delete.component.html',
  styleUrl: './tecnico-delete.component.css'
})

export class TecnicoDeleteComponent {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    perfis: [],
    dataCriacao: '',
  };

  constructor(
    private service: TecnicoService,
    private toast: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.tecnico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.tecnico.id).subscribe( resposta => {
      resposta.perfis = [];
      this.tecnico = resposta;
    } )
  }

  delete(): void {
    this.service.delete(this.tecnico.id).subscribe(() => {
        this.toast.success('Técnico deletado com sucesso', 'Delete');
        this.router.navigate(['tecnicos'])
    }, ex => {
        if (ex.error && ex.error.errors) {
            ex.error.errors.forEach(element => {
                this.toast.error(element.message);
            });
        } else if (ex.error && ex.error.message) {
            this.toast.error(ex.error.message);
        } else {
            this.toast.error('Técnico possui ordens de serviço e não pode ser deletado!');
        }
    })
}
}
