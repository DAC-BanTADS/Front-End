import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Login, Usuario } from 'src/app/shared';

const LS_CHAVE: string = 'usuarioLogado';
const LS_TOKEN: string = 'token';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public get usuarioLogado(): Usuario {
    let usu = localStorage[LS_CHAVE];
    return usu ? JSON.parse(localStorage[LS_CHAVE]) : null;
  }

  public set usuarioLogado(usuario: Usuario) {
    localStorage[LS_CHAVE] = JSON.stringify(usuario);
  }

  public get token(): any {
    let token = localStorage[LS_TOKEN];
    return token ? JSON.parse(localStorage[LS_TOKEN]) : null;
  }

  public set token(tk: any) {
    localStorage[LS_TOKEN] = JSON.stringify(tk);
  }

  login(login: Login) {
    return this.http.post(this.url + "/login", login).pipe(tap((res) => res));
  }

  logout() {
    delete localStorage[LS_CHAVE];
  }

  inserir(usuario: Usuario) {
    return this.http.post(this.url, usuario).pipe(take(1));
  }
}
