import { Directive, OnInit } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[cpfValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CpfValidatorDirective,
    multi: true
  }]
})
export class CpfValidatorDirective implements Validator {

  static cpfLength = 11;

  constructor() { }
  ngOnInit (): void { }

  validate (c: AbstractControl): ValidationErrors | null {
    if (!c.value) return { invalid: true }

    let cpf = c.value.replace(/[\D]/g, '')

    var Soma;
    var Resto;
    Soma = 0;
    if (cpf == "00000000000") return { 'invalid': true }

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(9, 10))) return { 'invalid': true }

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11)) Resto = 0;
    if (Resto != parseInt(cpf.substring(10, 11))) return { 'invalid': true }

    return null;
  }

}
