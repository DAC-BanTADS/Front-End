import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Transacao, Cliente, Conta } from 'src/app/shared';
import { ClienteService } from '../services/cliente.service';
import { ModalMessageComponent } from '../modal-message/modal-message.component';
import { ModalMessageErroComponent } from '../modal-message-erro/modal-message-erro.component';
import { LoginService } from 'src/app/auth/services/login.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransferenciaService } from './services/transferencia.service';

@Component({
  selector: 'app-transferencia',
  templateUrl: './transferencia.component.html',
  styleUrls: ['./transferencia.component.scss'],
})
export class TransferenciaComponent implements OnInit {
  @ViewChild('formTransferir') formTransferir!: NgForm;
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
          cliente = this.tratarRespostaSubscribe(cliente);
          this.cliente = cliente;

          this.contaService.buscarPorIdCliente(this.cliente.id).subscribe((conta) => {
            this.conta = this.tratarRespostaSubscribe(conta);
          })          
        } else {
          throw new Error('Cliente não encontrado: email = '
            + this.loginService.usuarioLogado.email);
        }
      }
      );
  }

  tratarRespostaSubscribe(res: any) {
    res = Object.values(res).reduce((a, b) => {
      return a;
    });
    return res;
  }

  abrirModalSucesso() {
    this.modalService.open(ModalMessageComponent);
  }

  abrirModalErro() {
    this.modalService.open(ModalMessageErroComponent);
  }

  transferir(): void {
    if (this.formTransferir.form.valid) {
      let diff = (this.conta.saldo + this.cliente.salario / 2) - Number(this.transacao.valorTransacao);

      if (diff >= 0) {
        this.conta.saldo -= Number(this.transacao.valorTransacao)
        this.contaService.alterar(this.conta).subscribe((res) => res)

        this.contaService.buscarPorId(this.transacao.idClienteDestinatario).subscribe((contaDestino) => {
          contaDestino = this.tratarRespostaSubscribe(contaDestino);
          contaDestino.saldo += Number(this.transacao.valorTransacao)
          this.contaService.alterar(contaDestino).subscribe((res) => res)
        })

        this.transacao.idCliente = this.cliente.id;
        this.transacao.tipoTransacao = "Transferência";
        this.transacao.saldo = this.conta.saldo;
        this.transacao.data = new Date().getTime();
        this.transacao.idClienteDestinatario = Number(this.transacao.idClienteDestinatario)

        // a cor da transferência depende de qual cliente tá vendo a tabela
        // se o cliente de origem da transferência tá vendo a tabela
        // significa que aquela transferência saiu do bolso do coitado
        // logo fica vermelho, mas se ele não for o cliente de origem
        // significa que ele recebeu uma transferência, logo fica azul
        this.transacao.color = ""
        
        this.transferenciaService.inserir(this.transacao).subscribe((res) => res);

        this.abrirModalSucesso();
      }
      else{
        this.abrirModalErro();
      }
    } else {
      this.abrirModalErro();
    }
  }
}
