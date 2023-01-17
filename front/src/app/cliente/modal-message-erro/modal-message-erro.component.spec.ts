import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMessageErroComponent } from './modal-message-erro.component';

describe('ModalMessageErroComponent', () => {
  let component: ModalMessageErroComponent;
  let fixture: ComponentFixture<ModalMessageErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalMessageErroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMessageErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
