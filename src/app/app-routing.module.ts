import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InserirClienteComponent } from './inserir-cliente/inserir-cliente.component';
import { InserirOrcamentoComponent } from './inserir-orcamento/inserir-orcamento.component';
import { OrcamentosComponent } from './orcamentos/orcamentos.component';
import { ContasReceberComponent } from './contas-receber/contas-receber.component';

const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'orcamentos', component: OrcamentosComponent},
    { path: 'inserir-orcamento', component: InserirOrcamentoComponent},
    { path: 'inserir-cliente', component: InserirClienteComponent},
    { path: 'contas-receber', component: ContasReceberComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
