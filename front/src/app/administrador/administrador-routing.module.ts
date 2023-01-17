import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ClienteDashComponent } from './cliente-dash/cliente-dash.component';
import { InserirGerenteComponent } from './inserir-gerente/inserir-gerente.component';
import { EditarGerenteComponent } from './editar-gerente/editar-gerente.component';

export const AdminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminDashComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
    data: {
      expectedRole: 'ADMIN',
    },
  },
  {
    path: 'admin/clientes',
    component: ClienteDashComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      expectedRole: 'ADMIN',
    }
  },
  {
    path: 'admin/gerentes/novo',
    component: InserirGerenteComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      expectedRole: 'ADMIN',
    }
  },
  {
    path: 'admin/gerentes/editar/:id',
    component: EditarGerenteComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      expectedRole: 'ADMIN',
    }
  }
]
