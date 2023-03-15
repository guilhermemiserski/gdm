import { TestBed } from '@angular/core/testing';

import { InserirOrcamentoService } from './inserir-orcamento.service';

describe('InserirOrcamentoService', () => {
  let service: InserirOrcamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InserirOrcamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
