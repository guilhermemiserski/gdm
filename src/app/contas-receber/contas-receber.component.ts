import { Component, OnInit } from '@angular/core';
import { OrcamentoService } from '../orcamento.service';
import { QrCodePix } from 'qrcode-pix';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-contas-receber',
  templateUrl: './contas-receber.component.html',
  styleUrls: ['./contas-receber.component.css'],
})
export class ContasReceberComponent implements OnInit {
  contas: any[];
  contasFiltered: any[];
  searchTerm: string;

  constructor(private orcamentoService: OrcamentoService) {}

  ngOnInit(): void {
    this.obterContas();
  }

  obterContas(): void {
    this.orcamentoService
      .buscarOrcamentosAceitosPeloCliente()
      .subscribe((contas) => {
        this.contas = contas;
        this.contasFiltered = contas;
      });
  }

  searchContas(): void {
    this.contasFiltered = this.contas.filter((orcamento) =>
      orcamento.cliente.nome
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase()) ||
      orcamento.cliente.endereco
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase())
    );
  }

  async gerarQrCodePix(conta) {
    const total = Number(conta.total);
    const qrCodePix = QrCodePix({
      version: '01',
      key: '09806191900', //or any PIX key
      name: 'Metalúrgica e vidraçaria GDM',
      city: 'PARANA',
      transactionId: '1', //max 25 characters
      message: 'Obrigado por comprar na GDM!',
      cep: '85570000',
      value: total,
    });

    const base64Data = await qrCodePix.base64();
    const blob = this.base64toBlob(base64Data);
    saveAs(blob, 'qrcode.png');
  }

  base64toBlob(base64Data) {
    const sliceSize = 1024;
    const byteCharacters = atob(base64Data.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/png' });
    return blob;
  }

  toggleClientePagou(conta) {
    conta.pago = !conta.pago;
    this.orcamentoService.alterarOrcamento(conta).subscribe();
  }
}
