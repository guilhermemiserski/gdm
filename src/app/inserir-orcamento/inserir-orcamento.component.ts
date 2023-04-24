import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Orcamento, OrcamentoService } from '../orcamento.service';
import Swal from 'sweetalert2';
import { Cliente, ClienteService } from '../cliente.service';
import { map, Observable, startWith } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inserir-orcamento',
  templateUrl: './inserir-orcamento.component.html',
  styleUrls: ['./inserir-orcamento.component.css'],
  providers: [DatePipe],
})
export class InserirOrcamentoComponent implements OnInit {
  orcamentoForm: FormGroup;
  orcamento: Orcamento = {
    id: null,
    cliente: null,
    validade: null,
    itens: [],
    cliente_aceitou: null,
    pago: false,
  };
  clientes: Cliente[];
  myControl = new FormControl();
  filteredOptions: Observable<Cliente[]>;
  clienteSelected: Cliente[];

  constructor(
    private formBuilder: FormBuilder,
    private orcamentoService: OrcamentoService,
    private clienteService: ClienteService,
    private datePipe: DatePipe
  ) {
    this.orcamentoForm = this.formBuilder.group({
      validade: ['', Validators.required],
      nomeItem: ['', Validators.required],
      quantidade: ['', [Validators.required, Validators.min(1)]],
      valor: ['', [Validators.required, Validators.min(0.01)]],
      altura: ['', [Validators.required]],
      largura: ['', [Validators.required]],
    });
  }

  async ngOnInit(): Promise<void> {
    this.clienteService.buscarClientes().subscribe((clientes) => {
      this.clientes = clientes;
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map((value) => this._filter(value || ''))
      );
    });
  }

  adicionarItem() {
    if (
      this.orcamentoForm.controls['nomeItem'].invalid ||
      this.orcamentoForm.controls['quantidade'].invalid ||
      this.orcamentoForm.controls['valor'].invalid
    ) {
      Swal.fire({
        title: 'Preencha todos os campos',
        text: 'Você precisa preencher todos os campos!',
        icon: 'error',
        confirmButtonColor: '#F27474',
      });
      return;
    }
    const item = {
      nome: this.orcamentoForm.value.nomeItem,
      quantidade: this.orcamentoForm.value.quantidade,
      valor: this.orcamentoForm.value.valor,
      altura: this.orcamentoForm.value.altura,
      largura: this.orcamentoForm.value.largura,
    };
    this.orcamento.itens.push(item);
    this.orcamentoForm.controls['nomeItem'].reset();
    this.orcamentoForm.controls['quantidade'].reset();
    this.orcamentoForm.controls['valor'].reset();
    this.orcamentoForm.controls['altura'].reset();
    this.orcamentoForm.controls['largura'].reset();
  }

  removerItem(index: number) {
    this.orcamento.itens.splice(index, 1);
  }

  enviarOrcamento() {
    if (
      this.orcamentoForm.get('validade').valid &&
      this.orcamento.itens.length > 0
    ) {
      this.orcamento.cliente = this.myControl.value;
      console.log(this.myControl.value);
      this.orcamento.validade = this.datePipe.transform(
        this.orcamentoForm.value.validade,
        'yyyy-MM-dd'
      );
      this.orcamentoService.enviarOrcamento(this.orcamento).subscribe(() => {
        Swal.fire({
          title: 'Bom trabalho!',
          text: 'Seu orçamento foi salvo com sucesso!',
          icon: 'success',
          confirmButtonColor: 'green',
        });
      });
      this.orcamentoForm.reset();
      this.myControl.reset();
      this.orcamento.itens = [];
    } else {
      Swal.fire({
        title: 'Preencha todos os campos',
        text: 'Você precisa preencher todos os campos e ter pelo menos um item adicionado!',
        icon: 'error',
        confirmButtonColor: '#F27474',
      });
    }
  }

  private _filter(value: any): Cliente[] {
    if (typeof value === 'object') {
      value = value.nome;
    }
    const filterValue = value.toLowerCase();

    return this.clientes.filter((option) =>
      option.nome.toLowerCase().includes(filterValue)
    );
  }

  displayFn(cliente: Cliente): string {
    return cliente && cliente.nome ? cliente.nome : '';
  }
}
