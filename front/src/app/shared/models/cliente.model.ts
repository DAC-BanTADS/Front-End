export class Cliente {
  constructor(
    public nome: string = '',
    public id?: number,
    public email?: string,
    public cpf?: string,
    public telefone?: string,
    public salario: number = 0,
    public rua?: string,
    public logradouro?: string,
    public numero?: number,
    public complemento?: string,
    public cep?: string,
    public cidade?: string,
    public estado?: string,
    public idConta?: number
  ) {}
}
