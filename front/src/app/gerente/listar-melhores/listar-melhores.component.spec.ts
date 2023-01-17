import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMelhoresComponent } from './listar-melhores.component';

describe('ListarMelhoresComponent', () => {
  let component: ListarMelhoresComponent;
  let fixture: ComponentFixture<ListarMelhoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarMelhoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMelhoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
