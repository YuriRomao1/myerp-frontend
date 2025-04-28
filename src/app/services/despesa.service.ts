import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Despesa } from '../model/despesa';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  constructor(private http: HttpClient) { }

   findById(id: any): Observable<Despesa> {
     return this.http.get<Despesa>(`${API_CONFIG.baserUrl}/despesas/${id}`);
   }

   findAll(): Observable<Despesa[]> {
     return this.http.get<Despesa[]>(`${API_CONFIG.baserUrl}/despesas`);
   }

   create(despesas: Despesa): Observable<Despesa> {
     return this.http.post<Despesa>(`${API_CONFIG.baserUrl}/despesas`, despesas);
   }

   update(despesas: Despesa): Observable<Despesa> {
     return this.http.put<Despesa>(`${API_CONFIG.baserUrl}/despesas/${despesas.id}`, despesas);
   }

   delete(id: any): Observable<Despesa> {
     return this.http.delete<Despesa>(`${API_CONFIG.baserUrl}/despesas/${id}`);
   }
 }
