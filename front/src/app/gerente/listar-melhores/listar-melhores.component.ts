import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Cliente, Conta, Gerente } from 'src/app/shared';
import { GerenteService } from '../services';

@Component({
  selector: 'app-listar-melhores',
  templateUrl: './listar-melhores.component.html',
  styleUrls: ['./listar-melhores.component.scss'],
})
export class ListarMelhoresComponent implements OnInit {
  data: Array<any> = new Array();
  gerente: Gerente = new Gerente();

  constructor(
    private gerenteService: GerenteService,
    private clienteService: ClienteService,
    private contaService: ContaService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.gerenteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((gerente) => {
        this.contaService
          .buscarContaMelhoresPorIdGerente(gerente)
          .subscribe((contas) => {
            contas.forEach((conta: Conta) => {
              this.clienteService
                .buscarPorId(conta.idCliente)
                .subscribe((cliente) => {
                  let obj = {
                    cpf: cliente.cpf,
                    nome: cliente.nome,
                    estado: cliente.estado,
                    cidade: cliente.cidade,
                    saldo: conta.saldo,
                  };

                  // o array data serve para mostrar
                  // linha a linha cada cliente com sua respectiva conta
                  this.data.push(obj);
                });
            });
          });
      });
  }
}
