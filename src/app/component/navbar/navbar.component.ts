import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	@Input() vistaEdit:boolean;
	@Input() busquedarecibida:number;

	@Input() inventarioRecibido:any;
	@Input() vista_editnav:any;
	@Input() navEditformcontrol;
	@Input() imagenObtenida;
	@Input() imagenRecibidaPa;

	//imagen especial
	@Output() limpiarImg = new EventEmitter<any>();

	//totales
	@Input() sumaGetdomesctico:number;
	@Input() sumaGetpeso:number;
	@Input() sumaGetancho:number;
	@Input() sumaGetlargo:number;
	@Input() sumaGetalto:number;

	@Output() sendresultadosCosmeticos = new EventEmitter<number>();
	@Output() enviarPeso = new EventEmitter<number>();
	@Output() enviarAncho = new EventEmitter<number>();
	@Output() enviarLargo = new EventEmitter<number>();
	@Output() enviarAlto = new EventEmitter<number>();
	@Output() enviarVistabtnEdit = new EventEmitter<boolean>();


	@Output() sendEdit = new EventEmitter<boolean>();
	@Output() limpiarBusqueda = new EventEmitter<number>();
	@Output() boleano = new EventEmitter<boolean>();
	@Output() result = new EventEmitter<any>();
	nombre =  new FormControl('', [Validators.required]);
	bolean:boolean = true;
  constructor() { }

  ngOnInit(): void {
  	// console.log(this.bolean);
  }

	


	buscar(){
		//limpiar resultado 

		this.sumaGetdomesctico = 0;
		this.sumaGetpeso = 0;
		this.sumaGetancho = 0;
		this.sumaGetlargo = 0;
		this.sumaGetalto = 0;

		const result = this.inventarioRecibido.filter(nombre => nombre.nombre_del_equipo == this.nombre.value);
		// console.log("resultado", result);
		if (result.length > 0) {
			this.bolean = false;
			//saca el boleano al padre
			this.boleano.emit(this.bolean);
			this.result.emit(result);
			// console.log("bolean true: ", this.bolean);
			// console.log("resutado puntoled: ", result.length);
		}
		else if(result.length == 0) {
			this.bolean = true;
			//saca el boleano al padre
			this.boleano.emit(this.bolean);
			alert("No se han encontrado resultados para tu búsqueda" + " " + ": '" + this.nombre.value + " '");
			//limpiar busqueda
		}
		this.busquedarecibida  = result.length;
		this.limpiarBusqueda.emit(this.busquedarecibida);
		



		for (var z = 0; z < result.length; z++) {
			this.sumaGetdomesctico = this.sumaGetdomesctico + result[z].consumo_energetico;
			this.sumaGetpeso = this.sumaGetpeso + result[z].pesoKg;
			this.sumaGetancho = this.sumaGetancho + result[z].anchoCm;
			this.sumaGetlargo = this.sumaGetlargo + result[z].largoCm;
			this.sumaGetalto = this.sumaGetalto + result[z].alturaCm;
       }

		this.sendresultadosCosmeticos.emit(this.sumaGetdomesctico);
		this.enviarPeso.emit(this.sumaGetpeso);
		this.enviarAncho.emit(this.sumaGetancho);
		this.enviarLargo .emit(this.sumaGetlargo);
		this.enviarAlto.emit(this.sumaGetalto);

	}

	detenerEdit(){

		//cambiar boton editar a registrar
		this.vista_editnav =true;
		this.enviarVistabtnEdit.emit(this.vista_editnav);
		
	    //no vaya a editar

	    this.vistaEdit = true;
	    this.sendEdit.emit(this.vistaEdit);

	    if (this.navEditformcontrol['controls'] == undefined) {
	    	//imagen enviada al fromulario
	    	// this.imagenObtenida = '';
	    	// this.limpiarImg.emit(this.imagenObtenida);
	    }else{
			this.navEditformcontrol['controls']['nombre_del_equipo'].patchValue('');
			this.navEditformcontrol['controls']['descripcion'].patchValue('');
			this.navEditformcontrol['controls']['consumo_energetico'].patchValue(0);
			this.navEditformcontrol['controls']['pesoKg'].patchValue(0);
			this.navEditformcontrol['controls']['anchoCm'].patchValue(0);
			this.navEditformcontrol['controls']['largoCm'].patchValue(0);
			this.navEditformcontrol['controls']['alturaCm'].patchValue(0);
// imagenObtenida
// imagenRecibidaPa
// limpiarImg
			// this.navEditformcontrol['controls']['imgprev']  = '';


			// this.navEditformcontrol['controls']['imgprev'].patchValue('assets/img/box.png');
			// console.log("a ver: ", this.navEditformcontrol['controls']['imgprev'])
			// this.navEditformcontrol['controls']['imgprev'].reset('');

			//imagen enviada al fromulario
			// this.imagenObtenida = '';
			this.limpiarImg.emit(this.imagenObtenida);
		}
	    //limipiano al editar y luego ir al agregar

	}

}
