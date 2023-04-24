import { Component, OnInit } from '@angular/core';
import { Orcamento, OrcamentoService } from 'src/app/orcamento.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-orcamentos',
  templateUrl: './orcamentos.component.html',
  styleUrls: ['./orcamentos.component.css']
})
export class OrcamentosComponent implements OnInit {
  orcamentos: Orcamento[] = [];
  orcamentosFiltered: Orcamento[] = [];
  searchTerm: string = '';

  constructor(private orcamentoService: OrcamentoService) { }

  ngOnInit(): void {
    this.obterOrcamentos();
  }

  obterOrcamentos(): void {
    this.orcamentoService.buscarOrcamentos().subscribe(orcamentos => {
      this.orcamentos = orcamentos;
      this.orcamentosFiltered = orcamentos;
      this.calcularTotal();
    });
  }

  searchOrcamentos(): void {
    this.orcamentosFiltered = this.orcamentos.filter((orcamento) =>
      orcamento.cliente.nome
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||
      orcamento.cliente.endereco
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  calcularTotal(): void {
    for (const orcamento of this.orcamentos) {
      let total = 0;
      for (const item of orcamento.itens) {
        total += item.altura * item.largura * item.valor * item.quantidade;
      }
      orcamento.total = total;
    }
  }

  deletarOrcamento(orcamento: Orcamento): void {
    Swal.fire({
        title: 'Tem certeza?',
        text: 'Você deseja realmente excluir este item?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir!',
        confirmButtonColor: '#dc3545',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
            this.orcamentoService.deletarOrcamento(orcamento).subscribe(() => {
                this.obterOrcamentos();
            });
        }
      });
  }

  toggleClienteAceitou(orcamento: Orcamento): void {
    orcamento.cliente_aceitou = !orcamento.cliente_aceitou;
    this.orcamentoService.alterarOrcamento(orcamento).subscribe();
  }
}