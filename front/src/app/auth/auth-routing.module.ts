import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

export const LoginRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];
