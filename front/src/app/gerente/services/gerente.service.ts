import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Gerente } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class GerenteService {
  private url: string = 'http://localhost:3000/gerente';

  constructor(private http: HttpClient) {}

  // colocar no servico do cliente e na tela do gerente chamar o servico do cliente
  getClienteData() {
    return this.http.get(`${this.url}/cliente`);
  }
 
  // excluir pois ja existe o metodo no servico da conta
  getMelhores(gerente: Gerente) {
    return this.http.put(`${this.url}/conta/melhores/${gerente.id}`, gerente).pipe(take(1));
  }

  listarTodos() {
    return this.http.get<Gerente>(this.url).pipe(tap((res) => res));
  }

  buscarPorId(id: number | undefined) {
    return this.http.get<Gerente>(`${this.url}/${id}`).pipe(take(1));
  }

  buscarPorEmail(email: string | undefined) {
    return this.http.get<Gerente>(`${this.url}/email/${email}`).pipe(take(1));
  }

  inserir(gerente: Gerente) {
    return this.http.post(this.url, gerente).pipe(take(1));
  }

  alterar(gerente: Gerente) {
    return this.http.put(`${this.url}/${gerente.id}`, gerente).pipe(take(1));
  }

  remover(id: number | undefined) {
    return this.http.delete(`${this.url}/${id}`).pipe(take(1));
  }
}
