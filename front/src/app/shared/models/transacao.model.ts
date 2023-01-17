export class Transacao {
  constructor(
    public data: any=0,
    public valorTransacao?: number,
    public id?: number,
    public idCliente?: number,
    public tipoTransacao?: string,
    public idClienteDestinatario?: number,
    public saldo?: number,
    public color?: string,
  ) {}
}
