import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaPage } from './fecha.page';

describe('FechaPage', () => {
  let component: FechaPage;
  let fixture: ComponentFixture<FechaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FechaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
