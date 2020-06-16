import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LigaComponent } from './components/liga/liga.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { routing, appRoutingProviers } from './app.routing';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from "@angular/forms";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LigaComponent,
    EquipoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing, 
    
  ],
  providers: [appRoutingProviers],
  bootstrap: [AppComponent]
})
export class AppModule { }
