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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ContasReceberComponent } from './contas-receber/contas-receber.component';


@NgModule({
  declarations: [
    AppComponent,
    InserirOrcamentoComponent,
    HomeComponent,
    OrcamentosComponent,
    OrcamentoPdfComponent,
    SidebarComponent,
    InserirClienteComponent,
    ContasReceberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
