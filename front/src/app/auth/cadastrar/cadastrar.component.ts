import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/cliente/services/cliente.service';
import { ContaService } from 'src/app/conta/services/conta.service';
import { Cliente, Conta } from 'src/app/shared';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.scss'],
})
export class CadastrarComponent implements OnInit {
  @ViewChild('formCadastrar', { static: true }) formCadastrar!: NgForm;
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private contaService: ContaService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  cadastrar() {
    if (this.formCadastrar.form.valid) {
      let conta = new Conta();

      this.clienteService.inserir(this.cliente).subscribe((res) => {
        // criar conta quando cria cliente
        Object.entries(res).forEach((res) => {
          if (res[0] === 'salario') {
            conta.limite = res[1] / 2;
          }

          if (res[0] === 'id') {
            conta.idCliente = res[1];
            conta.dataCriacao = new Date();
          }
        });

        conta.ativo = false;
        conta.saldo = 0;

        this.contaService.criarConta(conta);
      });

      this.router.navigate(['/login']);
    }
  }
}
