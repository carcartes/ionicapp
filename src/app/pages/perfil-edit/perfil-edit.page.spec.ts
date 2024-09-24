import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilEditPage } from './perfil-edit.page';

describe('PerfilEditPage', () => {
  let component: PerfilEditPage;
  let fixture: ComponentFixture<PerfilEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
