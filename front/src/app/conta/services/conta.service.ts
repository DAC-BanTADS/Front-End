import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GerenteService } from 'src/app/gerente/services/gerente.service';
import { Conta, Gerente } from 'src/app/shared';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContaService {
  private url: string = 'http://localhost:3000/conta';

  constructor(
    private gerenteService: GerenteService,
    private http: HttpClient
  ) {}

  buscarPorIdCliente(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}/cliente/${id}`).pipe(take(1));
  }

  buscarPorIdGerente(id: number | undefined) {
    return this.http
      .get<Conta[]>(`${this.url}/gerente/${id}`)
      .pipe(take(1));
  }

  buscarPorIdGerenteAtivo(id: number | undefined) {
    return this.http
      .get<Conta[]>(`${this.url}/gerente/${id}&ativo=false`)
      .pipe(take(1));
  }

  buscarPorId(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}/${id}`).pipe(take(1));
  }
  
  buscarContaMelhoresPorIdGerente(gerente: Gerente) {
    return this.http
      .get<Conta[]>(`${this.url}/melhores/${gerente.id}`)
      .pipe(take(1));
  }

  buscarSaquePorId(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}/saque/${id}`).pipe(take(1));
  }

  buscarDepositoPorId(id: number | undefined) {
    return this.http.get<Conta>(`${this.url}/deposito/${id}`).pipe(take(1));
  }

  transferenciaEntreContas(id1: number | undefined, id2: number | undefined) {
    return this.http.get<Conta>(`${this.url}/transferencia?idOrigem=${id1}&idDestino=${id2}`).pipe(take(1));
  }




  
  // apagar esse depois de arrumar o autenticacao
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

  alterar(conta: Conta) {
    return this.http.put(`${this.url}/${conta.id}`, conta).pipe(take(1));
  }

  remover(id: number | undefined) {
    return this.http.delete(`${this.url}/${id}`).pipe(take(1));
  }
}
