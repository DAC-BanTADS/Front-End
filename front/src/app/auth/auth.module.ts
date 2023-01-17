import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'
export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
import { CurrencyMaskModule } from "ng2-currency-mask";

@NgModule({
  declarations: [LoginComponent, CadastrarComponent],
  imports: [CommonModule, FormsModule, RouterModule, NgxMaskModule.forRoot(), CurrencyMaskModule],
})
export class AuthModule {}
