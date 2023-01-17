import { Gerente } from "src/app/shared"

export interface GerenteDashDto {
  gerente: Gerente
  totalClientes: number
  totalSaldoNegativo: number
  totalSaldoPositivo: number
}
