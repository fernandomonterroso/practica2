import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Liga } from '../models/liga.model';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.model';

@Injectable()

export class LigaService {
public url:string;
public idVar
  constructor(public _http:HttpClient) {
    this.url=GLOBAL.url
   }

   getLigas():Observable<any>{
    return this._http.get(this.url+'listar-ligas');
   }

   

   /*getLiga(id){
    return this._http.get(this.url+'/'+id)
   }*/

  //  addLiga(liga:Liga):Observable<any>{
  //   let params=JSON.stringify(liga);
  //   return this._http.post(this.url+'agregar-liga',params);

  //  }

  addLiga(liga:Liga):Observable<any>{
    let params=JSON.stringify(liga);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'agregar-liga',params, {headers: headers});

   }
   
   
 

   addEquipo(liga, equipo:Equipo):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    let params=JSON.stringify(equipo);
    return this._http.post(this.url+'agregar-equipo/'+liga,params,{headers:headers});
  }
  getEquipo(liga):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url+'listar-equipos/'+liga,{headers:headers});
  }
  
  getFromAPI(liga): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
	  return this._http.get(this.url+'grafica/'+liga,{headers:headers});
	}
  
   getLiga(id):Observable<any>{
     this.idVar = id;
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
    return this._http.get(this.url+'listar-liga/'+id,{headers:headers});
  }

   updateLiga(liga: Liga): Observable<any> {
    let params = JSON.stringify(liga);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.put(this.url + 'editar-liga/' + liga._id, params, { headers: headers })

  }

}
