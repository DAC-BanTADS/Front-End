import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/auth/services/login.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Cliente, Conta, Transacao } from 'src/app/shared';
import { ClienteService } from '../services/cliente.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { ModalMessageErroComponent } from '../modal-message-erro/modal-message-erro.component';
import { TransferenciaService } from '../transferencia/services/transferencia.service';

@Component({
  selector: 'app-saque',
  templateUrl: './saque.component.html',
  styleUrls: ['./saque.component.scss'],
})
export class SaqueComponent implements OnInit {
  @ViewChild('formSacar') formSacar!: NgForm;
  transacao: Transacao = new Transacao();
  cliente!: Cliente;
  conta: Conta = new Conta();
  mensagem: string = '';

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private contaService: ContaService,
    private transferenciaService: TransferenciaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.clienteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((cliente) => {
        if (cliente) {
          this.cliente = cliente;

          this.contaService
            .buscarPorIdCliente(this.cliente.id)
            .subscribe((conta) => {
              this.conta = conta;
            });
        } else {
          throw new Error(
            'Cliente não encontrado: email = ' +
              this.loginService.usuarioLogado.email
          );
        }
      });
  }

  abrirModalSucesso() {
    this.modalService.open(ModalMessageComponent);
  }

  abrirModalErro() {
    this.modalService.open(ModalMessageErroComponent);
  }

  sacar(): void {
    if (this.formSacar.form.valid) {
      // cod sacar
      let diff =
        this.conta.saldo +
        this.cliente.salario / 2 -
        Number(this.transacao.valorTransacao);

      if (diff >= 0) {
        this.conta.saldo -= Number(this.transacao.valorTransacao);
        this.contaService.alterar(this.conta).subscribe((res) => res);

        this.transacao.idCliente = this.cliente.id;
        this.transacao.tipoTransacao = 'Saque';
        this.transacao.saldo = this.conta.saldo;
        this.transacao.data = new Date().getTime();
        this.transacao.idClienteDestinatario = this.cliente.id;
        this.transacao.color = 'table-danger';

        this.transferenciaService
          .inserir(this.transacao)
          .subscribe((res) => res);

        this.abrirModalSucesso();
      } else {
        this.abrirModalErro();
      }
    } else {
      this.abrirModalErro();
    }
  }
}
