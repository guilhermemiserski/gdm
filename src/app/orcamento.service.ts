import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Item {
    nome: string;
    quantidade: number;
    valor: number;
}

export interface Orcamento {
    id: number;
    total?: number;
    cliente: string;
    endereco: string;
    validade: Date;
    itens: Item[];
}

@Injectable({
    providedIn: 'root'
})
export class OrcamentoService {

    private apiURL = 'http://localhost:8000/orcamentos/';

    constructor(private http: HttpClient) {}

    enviarOrcamento(orcamento: Orcamento): Observable<any> {
        return this.http.post(this.apiURL, orcamento);
    }

    buscarOrcamentos(): Observable<any> {
        return this.http.get(this.apiURL);
    }

    deletarOrcamento(orcamento: Orcamento): Observable<any> {
        return this.http.delete(`${this.apiURL}${orcamento.id}/`);
    }
}
