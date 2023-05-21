import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { ElementosComponent } from './elementos/elementos.component';
import { ListaComponent } from './lista/lista.component';
import { FormsModule } from '@angular/forms';
// import { Select2Module } from 'ng-select2';
@NgModule({
  declarations: [
    AppComponent,
    ElementosComponent,
    ListaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
