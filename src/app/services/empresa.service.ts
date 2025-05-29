import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private http: HttpClient) { }

  findById(id: any): Observable<Empresa> {
    return this.http.get<Empresa>(`${API_CONFIG.baserUrl}/empresas/${id}`);
  }

  findAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(`${API_CONFIG.baserUrl}/empresas`);
  }

  create(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(`${API_CONFIG.baserUrl}/empresas`, empresa);
  }

  update(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${API_CONFIG.baserUrl}/empresas/${empresa.id}`, empresa);
  }

  delete(id: any): Observable<Empresa> {
    return this.http.delete<Empresa>(`${API_CONFIG.baserUrl}/empresas/${id}`);
  }
}
