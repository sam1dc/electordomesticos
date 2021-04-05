import { Component, Input,ViewChild} from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { trigger, style, transition, animate, state } from '@angular/animations';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  // animations: [ 
  //   trigger('enterState', [
  //     state('void', style({
  //       transform: 'translateY(-100px)',
  //       opacity: 0
  //     })),
  //     transition(':enter', [
  //       animate(300,style({
  //         transform: 'translateY(0px)',
  //         opacity: 1
  //     }))
  //   ])
  // ])
  // ]
})


export class AppComponent {


  title = 'Electrodomesticos';
  resultencontrado=[];
  inventario:any =  [];
  result:any = [];
  resultNo:any = [];
  resultSelect:any = [];
  vista:boolean = true;
  titleEdit:boolean = true;

  resultBusqueda:number = 0;
  vistabtn_edit:boolean;

  formEdit:any;
  formulario:object = {
    nombre_del_equipo: '',
    descripcion: '',
    consumo_energetico: 0,
    pesoKg: 0,
    anchoCm: 0,
    largoCm: 0,
    alturaCm: 0,
    imgprev: 0,
    check: false,
  }

  sumadomestico:number=0;
  sumapeso:number=0;
  sumaancho:number=0;
  sumalargo:number=0;
  sumaalto:number=0;
  nombreVal:string;
  position:number;

  //imagen especial
  imagenFormulario:any;
  limpiarNav:any;
  imagenpreviadelformulario:any;
  tomatuImg:any;


  formularioControl:any  = '';


 formulariogroup(e){
     this.formularioControl = e;
     // console.error(e,this.formularioControl['controls'])
  }
  //recibe del formulario un arreglo
  // mensaje = parametro hijo recibido
  boleano(boleano){
    this.vista = boleano;
  }
  resultado(resultado){
    this.result = resultado;
     // console.log(resultado);
  }
	procesaPropagar(mensaje) {
    // determinar el dato obtenido
    // console.log(mensaje);
		this.inventario = mensaje;

	}
  vistaform(vistaform){
    this.vista = vistaform;
  }

  checkbusqueda(i,event){
    
    this.inventario[i].check= event;

  }
  eliminar(index){
  this.inventario.splice(index,1);

  if (this.result.length > 0) {
      this.result.splice(index,1);
    }
  }


  editar(index){
    //cambia el boton registrar por el boton edit
      this.vistabtn_edit = false;
      //pasa la posicion al formulario 
      this.formEdit = index;

     

      this.formularioControl['controls']['nombre_del_equipo'].patchValue(this.inventario[index].nombre_del_equipo);
      this.formularioControl['controls']['descripcion'].patchValue(this.inventario[index].descripcion);
      this.formularioControl['controls']['consumo_energetico'].patchValue(this.inventario[index].consumo_energetico);
      this.formularioControl['controls']['pesoKg'].patchValue(this.inventario[index].pesoKg);
      this.formularioControl['controls']['anchoCm'].patchValue(this.inventario[index].anchoCm);
      this.formularioControl['controls']['largoCm'].patchValue(this.inventario[index].largoCm);
      this.formularioControl['controls']['alturaCm'].patchValue(this.inventario[index].alturaCm);
      this.formularioControl['controls']['imgprev'].patchValue('');

   this.imagenpreviadelformulario =   this.inventario[index].imgprev;

    this.imagenFormulario  = this.inventario[index].imgprev;
      
  



      

     this.titleEdit = false;
    
    
  }



  busquedaSelect(){
    var resultcheck = this.inventario.filter(checkiando => checkiando.check  == true);
    //limpiar el res
 
    this.resultNo=[];
    this.sumadomestico = 0;
    this.sumapeso = 0;
    this.sumaalto = 0;
    this.sumalargo = 0;
    this.sumaancho = 0;


       for (var k = 0; k < resultcheck.length; k++) {
        this.sumadomestico=this.sumadomestico+resultcheck[k].consumo_energetico;
        this.sumapeso=this.sumapeso+resultcheck[k].pesoKg;
        this.sumaalto=this.sumaalto+resultcheck[k].alturaCm;
        this.sumalargo=this.sumalargo+resultcheck[k].largoCm;
        this.sumaancho=this.sumaancho+resultcheck[k].anchoCm;
        // console.log("consumo_energetico:",thisyyyyyyyyyyyyyyyyyyyyy
        // console.log("this.sumapeso:",this.sumapeso);
        // console.log("this.sumaalto:",this.sumaalto);
        // console.log("this.sumalargo:",this.sumalargo);
        // console.log("this.sumaancho",this.sumaancho);
       }
    


    this.result =  resultcheck ;
    // vista para ver la busqueda
    this.vista = false;
    for (var i = 0; i < this.inventario.length; i++) {
    this.inventario[i].check = false
    }
    this.resultBusqueda = this.result.length;
  }

  limpiandoBusqueNav(limpiar){
    this.resultBusqueda = limpiar;
  }
  volver(){
    this.vista = true;
    this.resultBusqueda = 0;
    this.sumadomestico = 0;
    this.sumapeso = 0;
    this.sumaancho = 0;
    this.sumalargo = 0;
    this.sumaalto = 0;
  }
  sendEditrecibido(vistEditar){
    this.titleEdit = vistEditar;
  }

  //resultado del consumo_energetico
  resultadoConsumo(consumo){
    this.sumadomestico = consumo;

  }
  resultadoPeso(peso){
    this.sumapeso = peso;

  }
  resultadoAncho(ancho){
    this.sumaancho = ancho;

  }
  resultadoLargo(largo){
    this.sumalargo = largo;

  }
  resultadoAlto(alto){
    this.sumaalto = alto;

  }
  recibevistaEdit(editTrue){
    this.vistabtn_edit = editTrue;
  }

  limpiandoImg(imagenNav){
    this.limpiarNav =imagenNav; 
  }
  enviaPreviaRecibida(imgprevget){

    this.imagenpreviadelformulario = imgprevget;
  }


}
