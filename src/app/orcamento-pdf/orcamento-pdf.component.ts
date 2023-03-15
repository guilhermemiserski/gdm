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

        .assinatura {
            margin-top: 100px;
            text-align: center;
        }

        .textoAssinatura {
            text-align: center;
            font-weight: bold;
        }
    `;

    // Conteúdo do PDF
    let conteudo = `
        <div class="header">
        <h1>Orçamento</h1>
        <img src="assets/logo.png" alt="Logo">
        </div>
        <div class="content">
        <p><strong>Cliente:</strong> ${this.orcamento.cliente}</p>
        <p><strong>Endereço:</strong> ${this.orcamento.endereco}</p>
        <p><strong>Validade:</strong> ${this.orcamento.validade}</p>
        <table>
            <thead>
            <tr>
                <th style="width: 60%">Nome do item</th>
                <th style="width: 20%">Quantidade</th>
                <th style="width: 20%">Valor</th>
            </tr>
            </thead>
            <tbody>
    `;

    let total = 0;
    for (const item of this.orcamento.itens) {
      const valorTotal = item.quantidade * item.valor;
      conteudo += `
        <tr>
            <td>${item.nome}</td>
            <td>${item.quantidade}</td>
            <td>R$${item.valor}</td>
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
        <p class="assinatura">______________________________________</p>
        <p class="textoAssinatura"> Assinatura responsável </p>
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
