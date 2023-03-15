import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InserirOrcamentoComponent } from './inserir-orcamento.component';

describe('InserirOrcamentoComponent', () => {
  let component: InserirOrcamentoComponent;
  let fixture: ComponentFixture<InserirOrcamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InserirOrcamentoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InserirOrcamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
