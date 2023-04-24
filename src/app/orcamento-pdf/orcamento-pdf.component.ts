import { Component, Input } from '@angular/core';
import * as html2pdf from 'html2pdf.js';
import { Orcamento } from 'src/app/orcamento.service';

@Component({
  selector: 'app-orcamento-pdf',
  templateUrl: './orcamento-pdf.component.html',
  styleUrls: ['./orcamento-pdf.component.css'],
})
export class OrcamentoPdfComponent {
  @Input() orcamento: Orcamento;

  gerarPdf() {
    // Estilos CSS
    const styles = `
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        import html2pdf from '../../../node_modules/.staging/html2pdf.js-07afca21/src/index';

        * {
        font-family: 'Roboto', sans-serif;
        margin: 0;
        padding: 0;
        }

        h1 {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
        }

        table {
        border-collapse: collapse;
        margin-bottom: 20px;
        width: 100%;
        }

        th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
        }

        th {
        background-color: #f2f2f2;
        }

        .total {
        font-weight: bold;
        }

        .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #808080;
        color: #fff;
        padding-left: 20px;
        }

        .header img {
        height: 100px;
        margin-right: 20px;
        }

        .content {
        padding: 20px;
        }

        .textoAssinatura {
            text-align: center;
            margin-top: 1rem;
            font-weight: bold;
        }
    `;

    // Conteúdo do PDF
    let conteudo = `
        <div class="header">
        <h1>Orçamento</h1>
        <img src="assets/logo.png" alt="Logo">
        </div>
        <div class="content row mb-5">
        <p class="col-4 "><strong>Cliente:</strong> ${this.orcamento.cliente.nome}</p>
        <p class="col-4 "><strong>Endereço:</strong> ${this.orcamento.cliente.endereco}</p>
        <p class="col-4 "><strong>CPF:</strong> ${this.orcamento.cliente.cpf}</p>
        <br />
        <p class="col-4 "><strong>Telefone:</strong> ${this.orcamento.cliente.telefone}</p>
        <p class="col-8 "><strong>Validade:</strong> ${this.orcamento.validade}</p>
        <table border="2">
            <thead>
            <tr>
                <th style="width: 40%">Nome do item</th>
                <th style="width: 10%">Altura</th>
                <th style="width: 10%">Largura</th>
                <th style="width: 10%">Quantidade</th>
                <th style="width: 30%">Valor unitário</th>
            </tr>
            </thead>
            <tbody>
    `;

    let total = 0;
    for (const item of this.orcamento.itens) {
      const valorTotal =
        item.altura * item.largura * item.valor * item.quantidade;
      conteudo += `
        <tr>
            <td>${item.nome}</td>
            <td>${item.altura}</td>
            <td>${item.largura}</td>
            <td>${item.quantidade}</td>
            <td>R$${item.valor * item.altura * item.largura}</td>
        </tr>
    `;
      total += valorTotal;
    }

    conteudo += `
            </tbody>
        </table>
        <div style="text-align: right;"> 
                <p> Valor total </p>
                <p class="total">R$${total.toFixed(2)}</p>
        </div>
        <div style="margin-top: 8rem;">
        <div style="width: 50%; border-bottom: 1px solid black; margin: 0 auto;"></div>
        <p class="textoAssinatura"> Assinatura responsável </p>
        </div>
        </div>
    `;

    // Criando o PDF
    const options = {
      filename: 'orcamento.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf().set(options).from(`<style>${styles}</style>${conteudo}`).save();
  }
}
