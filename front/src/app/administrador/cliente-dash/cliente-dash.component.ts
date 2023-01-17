import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ClienteDashDto } from '../dto/cliente-dash-dto';

@Component({
  selector: 'app-cliente-dash',
  templateUrl: './cliente-dash.component.html',
  styleUrls: ['./cliente-dash.component.scss']
})
export class ClienteDashComponent implements OnInit {

  page = 1
  pageSize = 15
  data!: ClienteDashDto[]
  collectionSize = 1

  constructor(private service: AdminService) { }

  ngOnInit () {
    this.refreshData()
  }

  refreshData () {
    this.service.listarClientes().subscribe(res => {
      this.data = res
    })
  }
}
