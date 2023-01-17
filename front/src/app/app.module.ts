import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule, DEFAULT_CURRENCY_CODE } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClienteModule } from './cliente/cliente.module';
import { GerenteModule } from './gerente/gerente.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AdministradorModule } from './administrador/administrador.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};
registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ClienteModule,
    AdministradorModule,
    GerenteModule,
    NgbModule,
    NgSelectModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    {
      provide: LOCALE_ID,
      useValue: 'pt'
  },

  /* if you don't provide the currency symbol in the pipe,
  this is going to be the default symbol (R$) ... */
  {
      provide:  DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
  },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
