import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orcamento, OrcamentoService } from '../orcamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inserir-orcamento',
  templateUrl: './inserir-orcamento.component.html',
  styleUrls: ['./inserir-orcamento.component.css'],
})
export class InserirOrcamentoComponent {
  orcamentoForm: FormGroup;
  orcamento: Orcamento = {
    id: null,
    cliente: '',
    endereco: '',
    validade: null,
    itens: [],
  };

  constructor(
    private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService
  ) {
    this.orcamentoForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      endereco: ['', Validators.required],
      validade: ['', Validators.required],
      nomeItem: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
    });
  }

  adicionarItem() {
    const item = {
      nome: this.orcamentoForm.value.nomeItem,
      quantidade: this.orcamentoForm.value.quantidade,
      valor: this.orcamentoForm.value.valor,
    };
    this.orcamento.itens.push(item);
    this.orcamentoForm.controls['nomeItem'].reset();
    this.orcamentoForm.controls['quantidade'].reset();
    this.orcamentoForm.controls['valor'].reset();
  }

  removerItem(index: number) {
    this.orcamento.itens.splice(index, 1);
  }

  onSubmit() {
    if (
      this.orcamentoForm.get('cliente').valid &&
      this.orcamento.itens.length > 0
    ) {
      this.orcamento.cliente = this.orcamentoForm.value.cliente;
      this.orcamento.endereco = this.orcamentoForm.value.endereco;
      this.orcamento.validade = this.orcamentoForm.value.validade;
      this.orcamentoService
        .enviarOrcamento(this.orcamento)
        .subscribe((data: {}) => {
          Swal.fire({
            title: 'Bom trabalho!',
            text: 'Seu orçamento foi salvo com sucesso!',
            icon: 'success',
            confirmButtonColor: '#0d6efd',
          });
        });
      this.orcamentoForm.reset();
      this.orcamento.itens = [];
    }
  }
}
