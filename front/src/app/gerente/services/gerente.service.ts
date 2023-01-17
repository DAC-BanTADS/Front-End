import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { Gerente } from 'src/app/shared';

@Injectable({
  providedIn: 'root',
})
export class GerenteService {
  private url: string = 'http://localhost:3000/gerentes';

  constructor(private http: HttpClient) {}

  listarTodos() {
    return this.http.get<Gerente>(this.url).pipe(tap((res) => res));
  }

  buscarPorId(id: number | undefined) {
    return this.http.get<Gerente>(`${this.url}/${id}`).pipe(take(1));
  }

  buscarPorEmail(email: string | undefined) {
    return this.http.get<Gerente>(`${this.url}?email=${email}`).pipe(take(1));
  }

  alterar(gerente: Gerente) {
    return this.http.put(`${this.url}/${gerente.id}`, gerente).pipe(take(1));
  }
}
