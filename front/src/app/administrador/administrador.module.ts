import { NgModule } from '@angular/core';
import { AdminDashComponent } from './admin-dash/admin-dash.component';
import { ClienteDashComponent } from './cliente-dash/cliente-dash.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { CommonModule } from '@angular/common';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
  NgbAccordionModule,
} from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from './services/admin.service';
import { ContaService } from '../conta/services/conta.service';
import { ClienteService } from '../cliente';
import { InserirGerenteComponent } from './inserir-gerente/inserir-gerente.component';
import { EditarGerenteComponent } from './editar-gerente/editar-gerente.component';

import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
import { CurrencyMaskModule } from 'ng2-currency-mask';

@NgModule({
  declarations: [
    AdminDashComponent,
    ClienteDashComponent,
    InserirGerenteComponent,
    EditarGerenteComponent,
  ],
  providers: [AdminService, ClienteService, ContaService],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgbPaginationModule,
    NgbTypeaheadModule,
    NgbAccordionModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule,
  ],
})
export class AdministradorModule {}
