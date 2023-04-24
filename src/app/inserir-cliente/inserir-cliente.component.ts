import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import Inputmask from 'inputmask';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-inserir-cliente',
  templateUrl: './inserir-cliente.component.html',
  styleUrls: ['./inserir-cliente.component.css'],
})
export class InserirClienteComponent {
  @ViewChild('cpfInput') cpfInput: ElementRef;
  @ViewChild('telefoneInput') telefoneInput: ElementRef;
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

  ngAfterViewInit() {
    Inputmask('999.999.999-99', { clearIncomplete: true }).mask(
      this.cpfInput.nativeElement
    );
    Inputmask('(99) 99999-9999', { clearIncomplete: true }).mask(
      this.telefoneInput.nativeElement
    );
  }

  enviarCliente() {
    this.submitted = true;
    if (this.clienteForm.invalid || !this.cpfValido) {
      return;
    }

    const cpf = this.clienteForm.value.cpf
      .replace(/[^\d]/g, '')
      .substring(0, 11);

    this.clienteForm.patchValue({ cpf });

    this.clienteService.enviarCliente(this.clienteForm.value).subscribe(() => {
      Swal.fire({
        title: 'Bom trabalho!',
        text: 'Cliente foi salvo com sucesso!',
        icon: 'success',
        confirmButtonColor: 'green',
      });
      this.clienteForm.reset();
    }, error => {
      if (error.status === 400) {
        Swal.fire({
          title: 'Ops!',
          text: 'Já existe um cliente com este CPF.',
          icon: 'error',
          confirmButtonColor: 'red',
        });
      }
    });
  }
}
