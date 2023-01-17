import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerenteService } from 'src/app/gerente/services/gerente.service';
import { Conta } from 'src/app/shared';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private url: string = 'http://localhost:3000/contas';

  constructor(
    private gerenteService: GerenteService,
    private http: HttpClient
  ) {}

  criarConta(conta: Conta) {
    // busca o gerente que tem menos clientes
    this.gerenteService.listarTodos().subscribe((res) => {
      res = Object.values(res).reduce((a, b) => {
        if (b.numeroClientes < a.numeroClientes) a = b;
        return a;
      });

      // finaliza a inserção dos dados na conta
      conta.idGerente = res.id;

      // cria a conta do cliente
      this.inserir(conta).subscribe((res) => res);

      // atualiza o numero de clientes do gerente
      res.numeroClientes!++;
      this.gerenteService.alterar(res).subscribe((res) => res);
    });
  }

  inserir(conta: Conta) {
    return this.http.post(this.url, conta).pipe(take(1));
  }

  buscarPorIdCliente(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}?idCliente=${id}`).pipe(take(1));
  }

  buscarPorIdGerente(id: number | undefined) {
    return this.http
      .get<Conta[]>(`${this.url}?idGerente=${id}&ativo=false`)
      .pipe(take(1));
  }

  buscarPorIdGerenteTodos(id: number | undefined) {
    return this.http
      .get<Conta[]>(`${this.url}?idGerente=${id}`)
      .pipe(take(1));
  }

  buscarPorId(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}?id=${id}`).pipe(take(1));
  }
  
  alterar(conta: Conta) {
    return this.http.put(`${this.url}/${conta.id}`, conta).pipe(take(1));
  }

  remover(id: number | undefined) {
    return this.http.delete(`${this.url}/${id}`).pipe(take(1));
  }
}
