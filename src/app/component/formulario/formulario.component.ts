import { Component, OnInit,  Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

declare interface  inventarioInfo {
    nombre_del_equipo:string;
    descripcion:string;
    consumo_energetico:number;
    pesoKg:number;
    anchoCm:number;
    largoCm:number;
    alturaCm:number;
    imgprev:string;
}
let inventarioInfo: inventarioInfo; 



const inventario: inventarioInfo[] = [];


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit{

//Ouput: funcion que se usa para sacar o exportar una variable tipo <any> y objetos 
@Output() propagar = new EventEmitter<any>();
@Output() private inventarioInfoNew = new EventEmitter<any>();
@Output() vistaform = new EventEmitter<boolean>();
@Output() enviarImgprevio = new EventEmitter<any>();

@Input() boleanocompa:boolean;
//editar
@Input() editarForm;
@Input() formularioRecibido;
@Input() inventarioEdit;
@Input() indexPosition:number;
@Input() vista_edit:boolean;
@Input() imagenRecibida;
@Input() limpiandoImagenEdit;

@Input() tomatuImg:string;


  inventarioInfo = new FormGroup({ 
  nombre_del_equipo:  new FormControl("",[Validators.required]), 
  descripcion:  new FormControl(''),  
  consumo_energetico: new FormControl('',[Validators.required]), 
  pesoKg: new FormControl('', [Validators.required]), 
  anchoCm: new FormControl('', [Validators.required]), 
  largoCm: new FormControl('', [Validators.required]),  
  alturaCm: new FormControl('', [Validators.required]),
  imgprev: new FormControl(''),
  check: new FormControl(false)
});
  inputregistrar =  new FormControl('', [Validators.required]);

  valoresIniciales={
      nombre_del_equipo:'',
      descripcion:'',
      consumo_energetico:0,
      pesoKg:0,
      anchoCm:0,
      largoCm:0,
      alturaCm:0,
      imgprev:''
  }
  name:string='';
  imgprev:string='assets/img/box.png';
  imgprevResgistro:string = 'assets/img/box.png'
  inventario: inventarioInfo[] = [];
  constructor() { 

  }

  ngOnInit(): void {

  }

 
//subir una imagen
  changeListener($event): void {
    return this.readThis($event.target);
   }

    readThis(inputValue: any): void {


        var file: File = inputValue.files[0];
        
     if (!file.type.match('image.*')) {
       alert("NO ES UNA IMAGEN");
    return;
    }
        var myReader: FileReader = new FileReader();
        var fileType = inputValue.parentElement.id;

       myReader.onloadend = (e) => {
        
         this.tomatuImg = myReader.result as string;

         this.imgprev =  myReader.result as string;
         this.enviarImgprevio.emit(this.imgprev);

         this.inventarioInfo.value.imgprev =  this.imgprev;
 
          // this.inventarioInfo.controls.imgprev.patchValue(this.imgprev)


          // console.log("myreader.resutl: ", myReader.result);
       };

        myReader.readAsDataURL(file);


  }

  changeListenerRegister($event): void {

    return this.readThisRegister($event.target);
   }
    readThisRegister(inputValue: any): void {

        var file: File = inputValue.files[0];

 
     if (!file.type.match('image.*')) {
       alert("NO ES UNA IMAGEN");
    return;
    }
        var myReader: FileReader = new FileReader();

        var fileType = inputValue.parentElement.id;

       myReader.onloadend = (e) => {
    

         this.imgprevResgistro = myReader.result as string;

          // this.inventarioInfo.controls.imgprev.patchValue(this.imgprev)

    

          // console.log("myreader.resutl: ", myReader.result);
       };

        myReader.readAsDataURL(file);



  }




//limitar caracteres espaciales
keyPress(event: KeyboardEvent) {
  const pattern = /[^e-]/;
  const inputChar = String.fromCharCode(event.charCode);
  if (!pattern.test(inputChar)) {    
      // invalid character, prevent input
      event.preventDefault();
  }

}



  guardar(e){
    this.inputregistrar.reset();
    this.imgprev = this.imgprevResgistro;
      if(!this.inventarioInfo.valid){
        alert("Rellene los campos vacios");
    e.stopPropagation();
    e.preventDefault(); 
    }else{
      // console.log("enviando info: ", this.inventarioInfo);
    this.inventario.push(this.inventarioInfo.value);

    this.inventarioInfo.value.imgprev =  this.imgprev;

     //este es el formulario form group enviado al hijo
    this.inventarioInfoNew.emit(this.inventarioInfo);

    // console.log("nombre del equipo: ", this.inventario);
    //inserta un parametro a la variable creada, el arreglo de objetos obtenidos
    this.propagar.emit(this.inventario);
    //Enviar imagen previa;
    this.enviarImgprevio.emit(this.imgprev);
    //recibe el boleano del hermano y lo envia al padre @input y @Ouput
    this.boleanocompa = true;
    this.vistaform.emit(this.boleanocompa);
    

    this.inventarioInfo.reset(this.valoresIniciales);
    this.imgprev = 'assets/img/box.png';
    this.imgprevResgistro = 'assets/img/box.png';

    //variable limpiar edit recibida del agregar del navbar
    // this.imgprevResgistro = this.limpiandoImagenEdit;

    }
  

    // console.log("ebnviando al new: ", this.inventarioInfo.value);
   



  }


  

  enviarEditado(e){
    if(!this.inventarioInfo.valid){
     alert("Rellene los campos vacios");
    e.stopPropagation();
    e.preventDefault();

    }else{
     
      if (this.imgprev == 'assets/img/box.png' || this.inventarioInfo.value.imgprev=='') {
         this.imgprev = this.inventario[this.editarForm].imgprev;
         this.inventarioInfo.value.imgprev=this.inventario[this.editarForm].imgprev;
      }
      
        this.inventario[this.editarForm].nombre_del_equipo = this.inventarioInfo.value.nombre_del_equipo;
        this.inventario[this.editarForm].descripcion = this.inventarioInfo.value.descripcion;
        this.inventario[this.editarForm].consumo_energetico = this.inventarioInfo.value.consumo_energetico;
        this.inventario[this.editarForm].pesoKg = this.inventarioInfo.value.pesoKg;
        this.inventario[this.editarForm].anchoCm = this.inventarioInfo.value.anchoCm;
        this.inventario[this.editarForm].largoCm = this.inventarioInfo.value.largoCm;
        this.inventario[this.editarForm].alturaCm = this.inventarioInfo.value.alturaCm;
        this.inventario[this.editarForm].imgprev  = this.imgprev;
      // this.inventario[this.editarForm].check = this.inventarioInfo.value.check;
      // this.inventarioInfo.reset();
      
     this.imgprev = 'assets/img/box.png';
    }
  }


  //funciones para validar
  get nombre(){
    return this.inventarioInfo.get('nombre_del_equipo');
  }

  get consumo(){
    return this.inventarioInfo.get('consumo_energetico');
  }

  get peso(){
    return this.inventarioInfo.get('pesoKg');
  }
  get ancho(){
    return this.inventarioInfo.get('anchoCm');
  }
  get largo(){
    return this.inventarioInfo.get('largoCm');
  }
  get altura(){
    return this.inventarioInfo.get('alturaCm');
  }

}


