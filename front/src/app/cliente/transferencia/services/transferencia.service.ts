import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { Transacao } from 'src/app/shared';

const LS_CHAVE: string = 'transacoes';

@Injectable({
  providedIn: 'root',
})
export class TransferenciaService {
  private url: string = 'http://localhost:3000/transacao';
  private headers: HttpHeaders = new HttpHeaders().set(
    'x-access-token',
    this.loginService.token
  );

  constructor(private http: HttpClient, private loginService: LoginService) {}

  listarTodos(
    idCliente: number | undefined,
    dataInicial: Date,
    dataFinal: Date
  ) {
    return this.http
      .get<Transacao[]>(
        this.url + `/${idCliente}/${dataInicial}/${dataFinal}`,
        {
          headers: this.headers,
        }
      )
      .pipe(tap((res) => res));
  }

  inserir(transacao: Transacao) {
    return this.http
      .post(this.url, transacao, { headers: this.headers })
      .pipe(take(1));
  }
}
