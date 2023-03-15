import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InserirOrcamentoComponent } from './inserir-orcamento/inserir-orcamento.component';
import { HomeComponent } from './home/home.component';
import { OrcamentosComponent } from './orcamentos/orcamentos.component';
import { HttpClientModule } from '@angular/common/http';
import { OrcamentoPdfComponent } from './orcamento-pdf/orcamento-pdf.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InserirClienteComponent } from './inserir-cliente/inserir-cliente.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    InserirOrcamentoComponent,
    HomeComponent,
    OrcamentosComponent,
    OrcamentoPdfComponent,
    SidebarComponent,
    InserirClienteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}
