import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRejeitarComponent } from './modal-rejeitar.component';

describe('ModalRejeitarComponent', () => {
  let component: ModalRejeitarComponent;
  let fixture: ComponentFixture<ModalRejeitarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRejeitarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRejeitarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
