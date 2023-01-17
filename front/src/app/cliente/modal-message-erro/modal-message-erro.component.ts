import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-message-erro',
  templateUrl: './modal-message-erro.component.html',
  styleUrls: ['./modal-message-erro.component.scss']
})
export class ModalMessageErroComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }


  ngOnInit(): void {
  }

}
