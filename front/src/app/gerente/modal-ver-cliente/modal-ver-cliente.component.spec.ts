import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerClienteComponent } from './modal-ver-cliente.component';

describe('ModalVerClienteComponent', () => {
  let component: ModalVerClienteComponent;
  let fixture: ComponentFixture<ModalVerClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalVerClienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVerClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
