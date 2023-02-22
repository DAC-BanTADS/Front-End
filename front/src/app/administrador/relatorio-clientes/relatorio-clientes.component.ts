import { Component, OnInit } from '@angular/core';
import { ContaService } from 'src/app/conta/services/conta.service';
import { GerenteService } from 'src/app/gerente/services';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-relatorio-clientes',
  templateUrl: './relatorio-clientes.component.html',
  styleUrls: ['./relatorio-clientes.component.scss']
})
export class RelatorioClientesComponent implements OnInit {
  public clienteData: any;
  public contaData: any;
  public contaIdData: any;

  constructor(
    private contaService: ContaService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.adminService.getContaData().subscribe( (res: any) => {
        this.contaData = res;
        console.log(this.contaData)
      }
    )

    this.adminService.getClienteData().subscribe( (res: any) => {
        this.clienteData = res;
      }
    )
    
    this.contaService.buscarPorIdCliente(this.clienteData.id).subscribe( (res: any) => {
        this.contaIdData = res;
      }
    )
  }
}
