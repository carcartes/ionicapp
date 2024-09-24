import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PublicarViajesPage } from './publicar-viajes.page';

describe('PublicarViajesPage', () => {
  let component: PublicarViajesPage;
  let fixture: ComponentFixture<PublicarViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicarViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
