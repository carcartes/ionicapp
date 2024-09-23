import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BuscarViajesPage } from './buscar-viajes.page';

describe('BuscarViajesPage', () => {
  let component: BuscarViajesPage;
  let fixture: ComponentFixture<BuscarViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
