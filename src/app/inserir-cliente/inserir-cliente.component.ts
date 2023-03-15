import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styleUrls: ['./inserir-cliente.component.css'],
})
export class InserirClienteComponent {
  clienteForm: FormGroup;
  submitted: boolean = false;
  cpfValido: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      endereco: ['', Validators.required],
      telefone: ['', Validators.required],
    });
  }

  enviarCliente() {
    this.submitted = true;
    if (this.clienteForm.invalid || !this.cpfValido) {
      return;
    }
    this.clienteService
      .enviarCliente(this.clienteForm.value)
      .subscribe((res: any) => {
        Swal.fire({
          title: 'Bom trabalho!',
          text: 'Cliente foi salvo com sucesso!',
          icon: 'success',
          confirmButtonColor: '#0d6efd',
        });
      });
  }
}
