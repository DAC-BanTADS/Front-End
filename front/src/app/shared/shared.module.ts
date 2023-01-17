import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpfValidatorDirective,NumericoDirective } from './directives';

// Pipes
import { CpfPipe } from './pipes';
import { PhonePipe } from './pipes/phone.pipe';
import { CepPipe } from './pipes/cep.pipe';

@NgModule({
  declarations: [NumericoDirective, CpfPipe, PhonePipe, CepPipe, CpfValidatorDirective],
  imports: [CommonModule],
  exports: [NumericoDirective, CpfPipe, PhonePipe, CepPipe, CpfValidatorDirective]
})
export class SharedModule { }
