export class Equipo{
    constructor(
        public _id:string,
        public nombreEquipo:string,
        public golesFavor:number,
        public golesContra:number,
        public diferenciaGoles:number,
        public partidosJugados:number,
        public puntos:number,
        public liga:string
        
    ){}
}