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

  constructor(private orcamentoService: OrcamentoService) { }

  ngOnInit(): void {
    this.obterOrcamentos();
  }

  obterOrcamentos(): void {
    this.orcamentoService.buscarOrcamentos().subscribe(orcamentos => {
      this.orcamentos = orcamentos;
      this.calcularTotal();
    });
  }

  calcularTotal(): void {
    for (const orcamento of this.orcamentos) {
      let total = 0;
      for (const item of orcamento.itens) {
        total += item.quantidade * item.valor;
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
}