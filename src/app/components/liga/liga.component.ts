import { Component, OnInit } from '@angular/core';
import { LigaService } from 'src/app/services/liga.service';
import { Liga } from 'src/app/models/liga.model';
import { GLOBAL } from 'src/app/services/global.service';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { Equipo } from 'src/app/models/equipo.model';
import { Response } from 'selenium-webdriver/http';
import { Chart } from  'chart.js' ;
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.scss'],
  providers:[LigaService, UploadService, EquipoService]
})

export  class LigaComponent implements OnInit {
  public url;
  public status; 
  public variableID : Liga;
  public idLiga;
  public aver;
  public prueba2: Equipo;


  //Grafica
  /**
	* Interval to update the chart
	* @var {any} intervalUpdate
	*/
	private intervalUpdate: any = null;
	
	/**
	* The ChartJS Object
	* @var {any} chart
	*/
	public chart: any = null;
	
	/**
	* Constructor
	*/
  //Variables de la liga
  public ligas:Liga;
  public modelLigas:Liga;
  public modelEquipo: Equipo
  constructor(
    private _ligaService:LigaService,
    private _equipoService: EquipoService,
    private _uploadService: UploadService,
    private _router: Router,
    public _http:HttpClient
  ) { 
    this.url=GLOBAL.url
    this.modelLigas = new Liga("","","","")
    this.variableID = new Liga("","","","")
    this.modelEquipo = new Equipo("","",0,0,0,0,0,"")
  }

  ngOnInit() {
    this.getLigas();
    this.chart = new Chart('realtime', {
			type: 'line',
			data: {
				labels: [],
				datasets: [
				  {
					label: 'Data',
					fill: false,
					data: [this.modelEquipo.diferenciaGoles],
					backgroundColor: '#168ede',
					borderColor: '#168ede'
				  }
				]
			  },
			  options: {
				tooltips: {
					enabled: false
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: 'white'
					}
				},
				scales: {
				  yAxes: [{
					  ticks: {
						  fontColor: "white"
					  }
				  }],
				  xAxes: [{
					ticks: {
						fontColor: "white",
						beginAtZero: true
					}
				  }]
				}
			  }
		});
		
		
		
		
  }

  showData(id): void {
		this._ligaService.getFromAPI(id).subscribe(response => {
			if(response.error === false) {
        console.log(response);
				let chartTime: any = new Date();
				//chartTime = chartTime.getHours() + ':' + ((chartTime.getMinutes() < 10) ? '0' + chartTime.getMinutes() : chartTime.getMinutes()) + ':' + ((chartTime.getSeconds() < 10) ? '0' + chartTime.getSeconds() : chartTime.getSeconds());
          
        if(this.chart.data.labels.length > 15) {
						this.chart.data.labels.shift();
						this.chart.data.datasets[0].data.shift();
				}
        this.chart.data.labels.push(chartTime);
        console.log(this.modelEquipo.diferenciaGoles);
				//this.chart.data.datasets[0].data.push(response.data);
        
        this.chart.data.datasets[0].data.push(this.modelEquipo.diferenciaGoles);
        this.chart.update();
			} else {
				console.error("ERROR: The response had an error, retrying");
			}
		}, error => {
			console.error("ERROR: Unexpected response");
		});
	}

  getEquipo(id){
    console.log("que onda"+id)
    this._equipoService.getEquipo(id).subscribe(
      
      response=>{
        console.log("response de getEquipo"+response)
        if(response.equipos){
         console.log(response.equipos);
         this.prueba2 = response.equipos;
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

getVamos(){
  var pruebas = this.idLiga
}

  getLiga(id){
    this.idLiga = id;
   
    console.log("estass es el id:"+this.idLiga)
    this._ligaService.getLiga(id).subscribe(
      
      response=>{
        
        if(response.contacto){
         console.log(response.contacto);
         this.variableID = response.contacto;
         console.log("variable liga" + this.variableID);
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

 

   EditLiga(){
     console.log()
     this._ligaService.updateLiga(this.variableID).subscribe(
       response => {
         if (!response.liga) {
           this.status = 'error'
           console.log(response)
         } else {
           this.status = 'ok'
           if(this.filesToUpload)
          //SUBIR IMAGEN DE USER
          this._uploadService.makeFileRequest(this.url + 'subir-imagen-liga/' + this.idLiga, [], this.filesToUpload, 'image')
            .then((result: any) => {
              
              console.table(result);
              this.getLigas();
              // this._route.navigate(['/home'])
            })
         }
      },
       error => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = 'error';
         }

       }
    )
 }


 addEquipo(){
  this._ligaService.addEquipo(this.idLiga,this.modelEquipo)
  .subscribe(
    response=>{
      console.log(response)
      if(response.equipo){
        console.log(response.equipo);
        // this.getContactos();
        this.status = 'Ok'
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

  getLigas(){
    this._ligaService.getLigas().subscribe(
      response=>{
        if(response.ligas){
          console.log(response.ligas)
          
          this.ligas=response.ligas
          this.status='ok'
        }
      },
      error=>{
        var errorMessage=<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status='error'
        }
      }
    )
  }

  addLiga(){
    this._ligaService.addLiga(this.modelLigas).subscribe(
      response=>{
        console.log(response)
        if(response.liga){
          console.log(response.liga)
          this.modelLigas=response.liga
          
          if(this.filesToUpload)
          //SUBIR IMAGEN DE USER
          this._uploadService.makeFileRequest(this.url + 'subir-imagen-liga/' + this.modelLigas._id, [], this.filesToUpload, 'image')
            .then((result: any) => {
              
              console.table(result);
              this.getLigas();
              // this._route.navigate(['/home'])
            })
        }
      },
      error=>{
        var errorMessage=<any>error;
        console.log(errorMessage);
        if(errorMessage != null){
          this.status='error'
        }
      }
    )
    
  }

  // editLoga() {
  //   this._ligaService.updateLiga(this.user).subscribe(
  //     response => {
  //       if (!response.user) {
  //         this.status = 'error'
  //       } else {
  //         this.status = 'ok'

  //         sessionStorage.setItem('identity', JSON.stringify(this.user))
  //         this.identity = this.user

  //         //SUBIR IMAGEN DE USER
  //         this._uploadService.makeFileRequest(this.url + 'subir-imagen-usuario/' + this.user._id, [], this.filesToUpload, this.token, 'image')
  //           .then((result: any) => {
  //             console.table(result);
  //             this.user.image = result.user.image;
  //             sessionStorage.setItem('identity', JSON.stringify(this.user));
  //             // this._route.navigate(['/home'])
  //           })
  //       }
  //     },
  //     error => {
  //       var errorMessage = <any>error;
  //       console.log(errorMessage);
  //       if (errorMessage != null) {
  //         this.status = 'error';
  //       }

  //     }
  //   )
  // }

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }



}
