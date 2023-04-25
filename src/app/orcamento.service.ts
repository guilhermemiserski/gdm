import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './cliente.service';

export interface Item {
    nome: string;
    quantidade: number;
    altura: number;
    largura: number;
    valor: number;
}

export interface Orcamento {
    id: number;
    total?: number;
    cliente: Cliente;
    validade: string;
    itens: Item[];
    cliente_aceitou?: boolean;
    pago: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class OrcamentoService {

    private apiURL = 'https://g7miserski.pythonanywhere.com/orcamentos/';

    constructor(private http: HttpClient) {}

    enviarOrcamento(orcamento: Orcamento): Observable<any> {
        return this.http.post(this.apiURL, orcamento);
    }

    buscarOrcamentos(): Observable<any> {
        return this.http.get(this.apiURL);
    }

    alterarOrcamento(orcamento: Orcamento): Observable<Orcamento> {
        return this.http.put<Orcamento>(`${this.apiURL}${orcamento.id}/`, orcamento);
    }

    deletarOrcamento(orcamento: Orcamento): Observable<any> {
        return this.http.delete(`${this.apiURL}${orcamento.id}/`);
    }

    buscarOrcamentosAceitosPeloCliente(): Observable<any> {
        return this.http.get(`${this.apiURL}buscar_orcamentos_aceitos_pelo_cliente/`)
    }
}
