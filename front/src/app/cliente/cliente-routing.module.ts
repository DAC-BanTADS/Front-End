import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

import { AlterarComponent } from './alterar/alterar.component';
import { DepositarComponent } from './depositar/depositar.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { HomeComponent } from './home/home.component';
import { SaqueComponent } from './saque/saque.component';
import { TransferenciaComponent } from './transferencia/transferencia.component';

export const ClienteRoutes: Routes = [
  {
    path: 'cliente',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/alterar',
    component: AlterarComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/depositar',
    component: DepositarComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/extrato',
    component: ExtratoComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/saque',
    component: SaqueComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
  {
    path: 'cliente/transferencia',
    component: TransferenciaComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'CLIENTE',
    },
  },
];
