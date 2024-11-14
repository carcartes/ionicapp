import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViajeEditPage } from './viaje-edit.page';

describe('ViajeEditPage', () => {
  let component: ViajeEditPage;
  let fixture: ComponentFixture<ViajeEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViajeEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
