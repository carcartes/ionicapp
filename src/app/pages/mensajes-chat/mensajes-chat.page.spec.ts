import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensajesChatPage } from './mensajes-chat.page';

describe('MensajesChatPage', () => {
  let component: MensajesChatPage;
  let fixture: ComponentFixture<MensajesChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
