import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormularioTreinoComponent } from './components/formulario-treino/formulario-treino.component';
import { ListaTreinoComponent } from './components/lista-treino/lista-treino.component';
import { ResultadoTreinoComponent } from './components/resultado-treino/resultado-treino.component';
import { ApiKeyInputComponent } from './components/api-key-input/api-key-input.component';

@NgModule({
  declarations: [
    AppComponent,
    FormularioTreinoComponent,
    ListaTreinoComponent,
    ResultadoTreinoComponent,
    ApiKeyInputComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
