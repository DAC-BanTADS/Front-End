import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalRejeitarComponent } from '../modal-rejeitar';
import { Cliente, Usuario } from 'src/app/shared';
import { ClienteService } from 'src/app/cliente';
import { LoginService } from 'src/app/auth/services/login.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { GerenteService } from '../services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private loginService: LoginService,
    private gerenteService: GerenteService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.gerenteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((res) => {
        this.contaService.buscarPorIdGerente(res.id).subscribe((res) => {
          res.map((res) => {
            if (!res.ativo) {
              this.clienteService
                .buscarPorId(res.idCliente)
                .subscribe((res) => {
                  this.clientes.push(res);
                });
            }
          });
        });
      });
  }

  aprovar($event: any, cliente: Cliente) {
    $event.preventDefault();

    if (confirm(`Deseja realmente aprovar o(a) cliente ${cliente.nome}?`)) {
      this.contaService.buscarPorIdCliente(cliente.id).subscribe((res) => {
        res.ativo = true;

        this.contaService.alterar(res).subscribe((res) => res);
      });
    }
  }

  abrirModalRejeitar(cliente: Cliente) {
    const modalRef = this.modalService.open(ModalRejeitarComponent);
    modalRef.componentInstance.cliente = cliente;
  }
}
