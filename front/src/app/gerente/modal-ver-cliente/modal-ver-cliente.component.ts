import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Cliente, Conta, Gerente } from 'src/app/shared';
import { GerenteService } from '../services';

@Component({
  selector: 'app-modal-ver-cliente',
  templateUrl: './modal-ver-cliente.component.html',
  styleUrls: ['./modal-ver-cliente.component.scss']
})
export class ModalVerClienteComponent implements OnInit {
  @Input() cliente!: Cliente;
  @Input() conta!: Conta;
  gerente: Gerente = new Gerente(0)

  constructor(public activeModal: NgbActiveModal, private gerenteService: GerenteService) { }

  ngOnInit(): void {
    this.gerenteService.buscarPorId(this.conta.idGerente).subscribe(res => {
      this.gerente = res
    })
  }

}
