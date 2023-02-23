import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GerenteDashDto } from '../dto/gerente-dash-dto';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { Gerente } from 'src/app/shared';

@Component({
  selector: 'app-admin-dash',
  templateUrl: './admin-dash.component.html',
  styleUrls: ['./admin-dash.component.scss'],
})
export class AdminDashComponent implements OnInit {
  page = 1;
  pageSize = 15;
  data!: GerenteDashDto[];
  collectionSize = 1;

  constructor(private service: AdminService, public router: Router) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData() {
    this.data = [];
    this.service.listarGerentes().subscribe((res) => (this.data = res));
  }

  removerGerente(gerente: Gerente) {
    this.service.removerGerente(gerente);
  }
}
