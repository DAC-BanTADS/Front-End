import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Transacao } from 'src/app/shared';

const LS_CHAVE: string = 'transacoes';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private url: string = 'http://localhost:3000/transacoes';

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get<Transacao[]>(this.url).pipe(tap(res=>res));
  }

  inserir(transacao: Transacao) {
    return this.http.post(this.url, transacao).pipe(take(1));
  }
}
