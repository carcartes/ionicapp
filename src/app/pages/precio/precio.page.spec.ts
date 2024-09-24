import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrecioPage } from './precio.page';

describe('PrecioPage', () => {
  let component: PrecioPage;
  let fixture: ComponentFixture<PrecioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrecioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
