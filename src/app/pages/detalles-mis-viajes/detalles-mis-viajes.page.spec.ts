import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesMisViajesPage } from './detalles-mis-viajes.page';

describe('DetallesMisViajesPage', () => {
  let component: DetallesMisViajesPage;
  let fixture: ComponentFixture<DetallesMisViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesMisViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
