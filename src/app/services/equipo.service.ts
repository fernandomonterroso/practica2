import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Liga } from '../models/liga.model';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable()
export class EquipoService {
  public url:string;
 
    constructor(public _http:HttpClient) {
      this.url=GLOBAL.url
     }



     getEquipo(liga):Observable<any>{
     let headers = new HttpHeaders().set('Content-Type', 'application/json')
     return this._http.get(this.url+'listar-equipos/'+liga,{headers:headers});
   }
}