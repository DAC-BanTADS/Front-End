import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Gerente } from 'src/app/shared';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-inserir-gerente',
  templateUrl: './inserir-gerente.component.html',
  styleUrls: ['./inserir-gerente.component.scss']
})
export class InserirGerenteComponent implements OnInit {

  @ViewChild('gerenteForm') gerenteForm!: NgForm
  gerente!: Gerente
  senha!: string

  constructor (private adminService: AdminService, private router: Router) {}

  ngOnInit (): void {
    this.gerente = new Gerente(0, undefined, "", "", "", "")
  }

  inserir(): void {
    if (this.gerenteForm.form.valid) {
      this.adminService.inserirGerente(this.gerente)
    }
  }

}
