import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRoutes } from './auth/auth-routing.module';
import { ClienteRoutes } from './cliente/cliente-routing.module';
import { GerenteRoutes } from './gerente/gerente-routing.module';
import { AdminRoutes } from './administrador/administrador-routing.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  ...ClienteRoutes,
  ...GerenteRoutes,
  ...AdminRoutes,
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
