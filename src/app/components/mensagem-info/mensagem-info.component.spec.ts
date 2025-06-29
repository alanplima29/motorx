import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemInfoComponent } from './mensagem-info.component';

describe('MensagemInfoComponent', () => {
  let component: MensagemInfoComponent;
  let fixture: ComponentFixture<MensagemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MensagemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
