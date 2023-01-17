import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDashComponent } from './cliente-dash.component';

describe('ClienteDashComponent', () => {
  let component: ClienteDashComponent;
  let fixture: ComponentFixture<ClienteDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClienteDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
