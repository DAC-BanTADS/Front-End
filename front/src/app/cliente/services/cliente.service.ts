import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, tap } from 'rxjs';
import { Cliente } from 'src/app/shared';
import { LoginService } from 'src/app/auth/services/login.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private url: string = 'http://localhost:3000/cliente';
  private headers: HttpHeaders = new HttpHeaders().set(
    'x-access-token',
    this.loginService.token
  );

  constructor(private http: HttpClient, private loginService: LoginService) {}

  listarTodos() {
    return this.http
      .get<Cliente[]>(this.url, { headers: this.headers })
      .pipe(tap((res) => res));
  }

  buscarPorId(id: number | undefined) {
    return this.http
      .get<Cliente>(`${this.url}/${id}`, { headers: this.headers })
      .pipe(take(1));
  }

  buscarPorEmail(email: string | undefined) {
    return this.http
      .get<Cliente>(`${this.url}/email/${email}`, { headers: this.headers })
      .pipe(take(1));
  }

  buscarPorCpf(cpf: string | undefined) {
    return this.http
      .get<Cliente>(`${this.url}/cpf/${cpf}`, { headers: this.headers })
      .pipe(take(1));
  }

  inserir(cliente: Cliente) {
    return this.http
      .post(this.url, cliente, { headers: this.headers })
      .pipe(take(1));
  }

  alterar(cliente: Cliente) {
    return this.http
      .put(`${this.url}/${cliente.id}`, cliente, { headers: this.headers })
      .pipe(take(1));
  }

  remover(id: number | undefined) {
    return this.http
      .delete(`${this.url}/${id}`, { headers: this.headers })
      .pipe(take(1));
  }
}
