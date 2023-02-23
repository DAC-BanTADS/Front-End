import { Injectable } from '@angular/core';
import { GerenteDashDto } from '../dto/gerente-dash-dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Conta, Gerente, Usuario } from 'src/app/shared';
import { ClienteService } from 'src/app/cliente';
import { ClienteDashDto } from '../dto/cliente-dash-dto';
import { ContaService } from 'src/app/conta/services/conta.service';
import { GerenteService } from 'src/app/gerente/services';
import { of, take } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private gerenteHost: string = 'http://localhost:3000/gerentes';
  private userHost: string = 'http://localhost:3000/users';
  private urlCliente: string = 'http://localhost:8280'; // com o 3000 dava 401 Unauthorized
  private urlConta: string = 'http://localhost:8480';
  private headers: HttpHeaders = new HttpHeaders().set(
    'x-access-token',
    this.loginService.token
  );

  constructor(
    private http: HttpClient,
    private clienteService: ClienteService,
    private contaService: ContaService,
    private gerenteService: GerenteService,
    private loginService: LoginService
  ) {}

  inserirGerente(gerente: Gerente): void {
    this.gerenteService.inserir(gerente).subscribe((res) => res);
  }

  removerGerente(gerente: Gerente): void {
    this.gerenteService.remover(gerente.id).subscribe((res) => res);
  }

  listarGerentes(): Observable<GerenteDashDto[]> {
    let gerentesDtos: GerenteDashDto[] = [];

    const res = of(gerentesDtos);

    this.gerenteService.listarTodos().subscribe((res) => {
      let gerentes = Object.values(res);

      gerentes.forEach((gerente) => {
        let totalClientes = 0;
        let totalSaldoPositivo = 0;
        let totalSaldoNegativo = 0;

        this.contaService.buscarPorIdGerente(gerente.id).subscribe((res) => {
          totalClientes = res.length;
          res.forEach((conta) =>
            conta.saldo < 0
              ? (totalSaldoNegativo -= conta.saldo)
              : (totalSaldoPositivo += conta.saldo)
          );

          const dto = {
            gerente,
            totalClientes,
            totalSaldoNegativo,
            totalSaldoPositivo,
          };

          gerentesDtos.push(dto);
          gerentesDtos = gerentesDtos.sort((a, b) =>
            a.gerente.nome!.localeCompare(b.gerente.nome!)
          );
        });
      });
    });

    return res;
  }

  listarClientes(): Observable<ClienteDashDto[]> {
    let res: ClienteDashDto[] = [];
    const clienteObs = this.clienteService.listarTodos();
    let objservableClienteDash = of(res);

    clienteObs.subscribe((clientes) => {
      clientes.forEach((cliente) => {
        this.contaService.buscarPorIdCliente(cliente.id).subscribe((conta) => {
          this.gerenteService
            .buscarPorId(conta.idGerente)
            .subscribe((gerente) => {
              const clienteDash: ClienteDashDto = {
                id: cliente.id,
                nome: cliente.nome,
                cpf: cliente.cpf,
                limite: conta.limite,
                saldo: conta.saldo,
                gerente: gerente.nome,
              };

              res.push(clienteDash);
            });
        });
      });
    });

    return objservableClienteDash;
  }

  getClienteData() {
    return this.clienteService.listarTodos();
  }

  getContaData() {
    return this.http.get(
      `${this.urlConta}/conta/cliente/6cd3ce01-bef9-4162-b655-2e1c6272ae32`,
      { headers: this.headers }
    );
  }
}
