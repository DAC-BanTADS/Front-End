export class Conta {
  constructor(
    public saldo: number = 0,
    public id?: number,
    public idCliente?: number,
    public dataCriacao?: Date,
    public limite: number = 0,
    public ativo?: boolean,
    public idGerente?: number
  ) {}
}
