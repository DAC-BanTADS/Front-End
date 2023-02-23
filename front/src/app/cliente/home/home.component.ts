import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { GerenteService } from 'src/app/gerente/services';
import { Cliente, Conta, Gerente } from 'src/app/shared';
import { ClienteService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cliente: Cliente = new Cliente();
  conta: Conta = new Conta();
  gerente: Gerente = new Gerente(0);

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private gerenteService: GerenteService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((cliente) => {
        cliente = cliente;
        this.cliente = cliente;

        this.contaService.buscarPorIdCliente(cliente.id).subscribe((conta) => {
          conta = conta;
          this.conta = conta;

          this.gerenteService
            .buscarPorId(conta.idGerente)
            .subscribe((gerente) => {
              this.gerente = gerente;
            });
        });
      });
  }
}
