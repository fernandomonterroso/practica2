import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { HomeComponent } from './components/home/home.component';
import { LigaComponent } from './components/liga/liga.component';
import { EquipoComponent } from './components/equipo/equipo.component';

//COMPONETS



const appRoutes: Routes =[
    {path: 'home', component: HomeComponent},
    {path: 'ligas', component: LigaComponent},
    {path: 'equipos', component: EquipoComponent},
    {path: '', component: HomeComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    
    {path: '**', component: HomeComponent},

]

export const appRoutingProviers: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

