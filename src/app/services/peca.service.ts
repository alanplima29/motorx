import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PecaService {
  private baseUrl = 'http://localhost'; // Base da API

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar_pecas.php`);
  }

  salvar(peca: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/salvar_peca.php`, peca);
  }

  atualizar(peca: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/atualizar_peca.php`, peca);
  }

  excluir(id: number): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/excluir_peca.php`, { id });
  }
}
