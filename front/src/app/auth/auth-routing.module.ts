import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { RelatorioClientesComponent } from '../administrador/relatorio-clientes/relatorio-clientes.component';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: RelatorioClientesComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
