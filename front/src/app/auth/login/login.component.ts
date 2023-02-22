import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/shared';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin', { static: true }) formLogin!: NgForm;
  login: Login = new Login();
  loading: boolean = false;
  message!: string;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((login) => {
        /*if (login.auth == true) {
          this.loginService.usuarioLogado = usuario;
          this.loading = false;
          this.navegarParaAHome(usuario.cargo);
        } else if (login.auth == false) {
          this.message = login.massage;
        }*/
      });
    }
    this.loading = false;
  }

  public navegarParaAHome(cargo: string) {
    switch (cargo) {
      case 'ADMIN':
        return this.router.navigate(['/admin']);
      case 'GERENTE':
        return this.router.navigate(['/gerente']);
      case 'CLIENTE':
        return this.router.navigate(['/cliente']);
      default:
        return this.router.navigate(['/login']);
    }
  }
}
