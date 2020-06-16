import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.service';
import { Equipo } from 'src/app/models//equipo.model';
import { LigaService } from 'src/app/services/liga.service';
import { LigaComponent } from '../liga/liga.component';
@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.scss'],
  providers: [EquipoService, LigaService, LigaComponent]
})
export class EquipoComponent implements OnInit {
  public equipo: Equipo;
  public status;
 public retenerID;
 public aver;
  constructor(private _equipoService: EquipoService,
    private _ligaComponent: LigaComponent,
    ) {

    this.equipo = new Equipo("","",0,0,0,0,0,"");
    
   }

  ngOnInit() {
   
  }

  

  getLiga(id){
    console.log("que pedo"+this.retenerID)
    this._equipoService.getEquipo(this.retenerID).subscribe(
      response=>{
        if(response.contacto){
         console.log(response.equipos);
         this.equipo = response.equipos;
         console.log("variable liga" + this.equipo);
        }
      },
      error=>{
        var errorMessage = <any>error;
        console.log(errorMessage)
        if(errorMessage !=null){
          this.status = 'error'
        }
      }
    )
  }


  // registrar(){
  //   this._equipoService.registro(this.equipo).subscribe(
  //     response=>{
  //       if(response){
  //         console.log(response);
  //         this.status = 'ok';
  //       }
  //     },
  //     error=>{
  //       console.log(<any>error);
  //       this.status = 'error';
  //     }

  //   )
  // }
}
