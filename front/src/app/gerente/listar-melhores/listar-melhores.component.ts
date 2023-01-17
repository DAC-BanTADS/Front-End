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
  gerente: Gerente = new Gerente()

  constructor(
    private gerenteService: GerenteService,
    private clienteService: ClienteService,
    private contaService: ContaService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.gerenteService.buscarPorEmail(this.loginService.usuarioLogado.email).subscribe((gerente) => {
      gerente = this.tratarRespostaSubscribe(gerente)

      this.clienteService.listarTodos().subscribe((clientes) => {
        // itera pelos clientes
        clientes.forEach((cliente: Cliente) => {
          // pega a conta de cada cliente
          this.contaService.buscarPorIdCliente(cliente.id).subscribe((conta) => {
            conta = Object.values(conta).reduce((a, b) => {
              return a;
            });
  
            if (conta.idGerente == gerente.id) {
              // cria um objeto para adicionar no array data
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
              this.data.sort((a, b) => b.saldo - a.saldo);
              this.data = this.data.slice(0, 5);
            }
  
          });
        });
      });
    })
  }

  tratarRespostaSubscribe(res: any) {
    res = Object.values(res).reduce((a, b) => {
      return a;
    });

    return res;
  }
}
