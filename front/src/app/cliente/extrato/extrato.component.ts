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

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private transferenciaService: TransferenciaService
  ) {}

  ngOnInit(): void {
    this.clienteService
      .buscarPorEmail(this.loginService.usuarioLogado.email)
      .subscribe((cliente) => {
        this.cliente = cliente;
      });
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
      let dataInicial: any = (<HTMLInputElement>(
        document.getElementById('dataInicial')
      )).value;
      let dataFinal: any = (<HTMLInputElement>(
        document.getElementById('dataFinal')
      )).value;

      this.transferenciaService
        .listarTodos(this.cliente.id, dataInicial, dataFinal)
        .subscribe((transacoes) => {
          this.transacoes = transacoes;
        });
    }
  }
}
