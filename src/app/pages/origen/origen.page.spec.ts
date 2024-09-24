import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrigenPage } from './origen.page';

describe('OrigenPage', () => {
  let component: OrigenPage;
  let fixture: ComponentFixture<OrigenPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OrigenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
