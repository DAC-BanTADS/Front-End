import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClienteService } from 'src/app/cliente';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Cliente, Conta } from 'src/app/shared';
import { ModalVerClienteComponent } from '../modal-ver-cliente';
import { GerenteService } from '../services';
import { LoginService } from 'src/app/auth/services/login.service';

@Component({
  selector: 'app-listar-todos',
  templateUrl: './listar-todos.component.html',
  styleUrls: ['./listar-todos.component.scss'],
})
export class ListarTodosComponent implements OnInit {
  data: any = [];

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private gerenteService: GerenteService,
    private loginService: LoginService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.popularData();

    // pegar a pesquisa pra filtrar por nome ou cpf
    document
      .querySelector('#nome')
      ?.addEventListener('input', this.pesquisar.bind(this), false);
    document
      .querySelector('#cpf')
      ?.addEventListener('input', this.pesquisar.bind(this), false);
  }

  pesquisar(event: any) {
    let target = event.currentTarget;
    let type = target.name;

    if (target.value !== '') {
      let aux: any = [];

      this.gerenteService
        .buscarPorEmail(this.loginService.usuarioLogado.email)
        .subscribe((gerente) => {
          gerente = Object.values(gerente).reduce((a, b) => {
            return a;
          });

          this.contaService
            .buscarPorIdGerente(gerente.id)
            .subscribe((contas) => {
              contas.map((conta) => {
                this.clienteService
                  .buscarPorId(conta.idCliente)
                  .subscribe((cliente: Cliente | any) => {
                    if (
                      cliente[type]
                        .toLowerCase()
                        .includes(target.value.toLowerCase())
                    ) {
                      this.contaService
                        .buscarPorIdCliente(cliente.id)
                        .subscribe((conta) => {
                          conta = Object.values(conta).reduce((a, b) => {
                            return a;
                          });

                          let obj = {
                            cliente: cliente,
                            conta: conta,
                          };

                          aux.push(obj);
                        });
                    }
                  });
              });
            });
        });

      this.data = aux;
    } else {
      this.data = [];
      this.popularData();
    }
  }

  popularData() {
    this.gerenteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((gerente) => {
        gerente = Object.values(gerente).reduce((a, b) => {
          return a;
        });

        this.contaService.buscarPorIdGerenteTodos(gerente.id).subscribe((contas) => {
          console.log(contas)
          contas.map((conta) => {
            this.clienteService
              .buscarPorId(conta.idCliente)
              .subscribe((cliente) => {
                let obj = {
                  cliente: cliente,
                  conta: conta,
                };

                this.data.push(obj);
              });
          });
        });
      });
  }

  abrirModalVerCliente(cliente: Cliente, conta: Conta) {
    const modalRef = this.modalService.open(ModalVerClienteComponent);
    modalRef.componentInstance.cliente = cliente;
    modalRef.componentInstance.conta = conta;
  }
}
