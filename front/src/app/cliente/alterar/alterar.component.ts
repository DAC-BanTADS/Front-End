import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/shared';
import { ClienteService } from '../services/cliente.service';
import { LoginService } from 'src/app/auth/services/login.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-alterar',
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.scss'],
})
export class AlterarComponent implements OnInit {
  @ViewChild('formAlterar') formAlterar!: NgForm;
  cliente: Cliente = new Cliente();

  constructor(
    private clienteService: ClienteService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // snapshot.params de ActivatedRoute dá acesso aos parâmetros passados
    // Operador + (antes do this) converte para número
    let id = +this.route.snapshot.params['id'];

    this.clienteService
    .buscarPorEmail(this.loginService.usuarioLogado.email)
    .subscribe((cliente) => {
      if (cliente) {
        cliente = this.tratarRespostaSubscribe(cliente);
        this.cliente = cliente;
      } else {
        throw new Error('Cliente não encontrado: id = ' + id);
      }
    });
  }

  tratarRespostaSubscribe(res: any) {
    res = Object.values(res).reduce((a, b) => {
      return a;
    });

    return res;
  }

  alterar(): void {
    // Verifica se o formulário é válido
    if (this.formAlterar.form.valid) {
      // Efetivamente atualiza a pessoa
      this.clienteService.alterar(this.cliente).subscribe((res) => res);
      // Redireciona para /cliente/home
      this.router.navigate(['/cliente/home']);
    }
  }
}
