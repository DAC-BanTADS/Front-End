import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login, Usuario } from 'src/app/shared';
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
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.message = params['error'];
    });
  }

  logar(): void {
    this.loading = true;
    if (this.formLogin.form.valid) {
      this.loginService.login(this.login).subscribe((login) => {
        let auth: boolean = Object.entries(login)[0][1];
        let token: any = Object.entries(login)[1][1];

        if (auth) {
          let response: any = Object.entries(login)[2][1];
          const user: Usuario = response;

          this.loginService.usuarioLogado = user;
          this.loading = false;
          this.navegarParaAHome(user.cargo);
        } else {
          this.message = token;
        }
      });
    }
    this.loading = false;
  }

  public navegarParaAHome(cargo: string | undefined) {
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
