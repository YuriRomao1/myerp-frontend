import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChamadoEmpresa } from '../model/ChamadoEmpresa';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class ChamadoEmpresaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<ChamadoEmpresa> {
    return this.http.get<ChamadoEmpresa>(`${API_CONFIG.baserUrl}/chamados/empresa/${id}`);
  }

  findAll(): Observable<ChamadoEmpresa[]> {
    return this.http.get<ChamadoEmpresa[]>(`${API_CONFIG.baserUrl}/chamados/empresa`);
  }

  create(chamadoEmpresa: ChamadoEmpresa): Observable<ChamadoEmpresa> {
    return this.http.post<ChamadoEmpresa>(`${API_CONFIG.baserUrl}/chamados/empresa`, chamadoEmpresa);
  }

  update(chamadoEmpresa: ChamadoEmpresa): Observable<ChamadoEmpresa> {
    return this.http.put<ChamadoEmpresa>(`${API_CONFIG.baserUrl}/chamados/empresa/${chamadoEmpresa.id}`, chamadoEmpresa);
  }
}
