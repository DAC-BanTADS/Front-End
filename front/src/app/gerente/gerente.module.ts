import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { GerenteService } from './services/gerente.service';

import { HomeComponent } from './home/home.component';
import { ModalRejeitarComponent } from './modal-rejeitar/modal-rejeitar.component';
import { ListarTodosComponent } from './listar-todos/listar-todos.component';
import { ModalVerClienteComponent } from './modal-ver-cliente/modal-ver-cliente.component';
import { ListarMelhoresComponent } from './listar-melhores/listar-melhores.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [
    HomeComponent,
    ModalRejeitarComponent,
    ListarTodosComponent,
    ModalVerClienteComponent,
    ListarMelhoresComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule, NgxMaskModule.forRoot(), CurrencyMaskModule],


  
  providers: [GerenteService],
})
export class GerenteModule {}
