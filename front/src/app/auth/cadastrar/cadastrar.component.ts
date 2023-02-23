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
      this.clienteService.inserir(this.cliente).subscribe((res) => res);

      this.router.navigate(['/login']);
    }
  }
}
