import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinoPage } from './destino.page';

describe('DestinoPage', () => {
  let component: DestinoPage;
  let fixture: ComponentFixture<DestinoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
