import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { LoginService } from 'src/app/auth/services/login.service';
import { Gerente } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class GerenteService {
  private url: string = 'http://localhost:3000/gerente';
  private headers: HttpHeaders = new HttpHeaders().set(
    'x-access-token',
    this.loginService.token
  );

  constructor(private http: HttpClient, private loginService: LoginService) {}

  // colocar no servico do cliente e na tela do gerente chamar o servico do cliente
  getClienteData() {
    return this.http.get(`${this.url}/cliente`, { headers: this.headers });
  }

  // excluir pois ja existe o metodo no servico da conta
  getMelhores(gerente: Gerente) {
    return this.http
      .put(`${this.url}/conta/melhores/${gerente.id}`, gerente, {
        headers: this.headers,
      })
      .pipe(take(1));
  }

  listarTodos() {
    return this.http
      .get<Gerente>(this.url, { headers: this.headers })
      .pipe(tap((res) => res));
  }

  buscarPorId(id: number | undefined) {
    return this.http
      .get<Gerente>(`${this.url}/${id}`, { headers: this.headers })
      .pipe(take(1));
  }

  buscarPorEmail(email: string | undefined) {
    return this.http
      .get<Gerente>(`${this.url}/email/${email}`, { headers: this.headers })
      .pipe(take(1));
  }

  inserir(gerente: Gerente) {
    return this.http
      .post(this.url, gerente, { headers: this.headers })
      .pipe(take(1));
  }

  alterar(gerente: Gerente) {
    return this.http
      .put(`${this.url}/${gerente.id}`, gerente, { headers: this.headers })
      .pipe(take(1));
  }

  remover(id: number | undefined) {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers })
      .pipe(take(1));
  }
}
