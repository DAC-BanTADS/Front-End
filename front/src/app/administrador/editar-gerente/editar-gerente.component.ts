import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { NgForm } from '@angular/forms';
import { Gerente } from 'src/app/shared';
import { GerenteService } from 'src/app/gerente/services';

@Component({
  selector: 'app-editar-gerente',
  templateUrl: './editar-gerente.component.html',
  styleUrls: ['./editar-gerente.component.scss']
})
export class EditarGerenteComponent implements OnInit {
  @ViewChild('gerenteForm') gerenteForm!: NgForm
  gerente!: Gerente

  constructor(private gerenteService: GerenteService, public activatedRoute: ActivatedRoute) { }

  ngOnInit (): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    this.gerenteService.buscarPorId(Number(id)).subscribe(gerente => this.gerente = gerente)
  }

  atualizar () {
    if (this.gerenteForm.form.valid) {
      this.gerenteService.alterar(this.gerente).subscribe(res => {
        window.location.replace('/admin')
      })
    }
  }
}
