import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerViajeConductorPage } from './ver-viaje-conductor.page';

describe('VerViajeConductorPage', () => {
  let component: VerViajeConductorPage;
  let fixture: ComponentFixture<VerViajeConductorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerViajeConductorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
