import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente, Transacao } from 'src/app/shared';
import { ClienteService } from '../services/cliente.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TransferenciaService } from '../transferencia/services/transferencia.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss'],
})
export class ExtratoComponent implements OnInit {
  @ViewChild('formExtrato') formExtrato!: NgForm;
  cliente: Cliente = new Cliente();
  transacoes: Transacao[] = [];
  aux: Transacao[] = [];

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private transferenciaService: TransferenciaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clienteService.buscarPorEmail(this.loginService.usuarioLogado.email).subscribe((cliente) => {
      this.cliente = this.tratarRespostaSubscribe(cliente)
    })
  }

  tratarRespostaSubscribe(res: any) {
    res = Object.values(res).reduce((a, b) => {
      return a;
    });

    return res;
  }
  
  addDays(date: any, days: any) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  gerarExtrato(): void {
    // Verifica se o formulário é válido
    if (this.formExtrato.form.valid) {
      //código gerar extrato
      let dataInicial: any = (<HTMLInputElement>document.getElementById('dataInicial')).value;
      let dataFinal: any = (<HTMLInputElement>document.getElementById('dataFinal')).value;
      
      dataInicial = this.addDays(dataInicial, 1).getTime()
      dataFinal = this.addDays(dataFinal, 1).getTime()
      
      this.transferenciaService.listarTodos().subscribe((transacoes) => {
        transacoes.forEach((transacao) => {
          if (transacao.idCliente == this.cliente.id || transacao.idClienteDestinatario == this.cliente.id) {
            if (transacao.data >= dataInicial && transacao.data <= dataFinal) {
              transacao.data = new Date(transacao.data).toUTCString().split(' ').slice(0, 4).join(' ');
              this.aux.push(transacao)
            }
          }
        })
        
        this.transacoes = this.aux
      })
    }
  }
}
