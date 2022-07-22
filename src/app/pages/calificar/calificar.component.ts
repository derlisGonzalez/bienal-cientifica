import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CriterioModel } from 'src/app/models/criterio.model';
import { ProyectoModel } from 'src/app/models/proyecto.model';
import { CriteriosService } from 'src/app/services/criterios.service';
import { ProyectosService } from 'src/app/services/proyectos.service';

@Component({
  selector: 'app-calificar',
  templateUrl: './calificar.component.html',
  styleUrls: ['./calificar.component.css']
})


export class CalificarComponent implements OnInit {

  puntosTem: CriterioModel[] = [];
  puntos: CriterioModel[] = [];
  public criterios: CriterioModel[] = [];


  //public carreras: CarreraModel[] = [];
  public criterioSeleccionado: CriterioModel;
  //public carreraSeleccionada: CarreraModel;
  public proyecto: ProyectoModel = new ProyectoModel();

  constructor( private proyectosService: ProyectosService,
               private criteriosService: CriteriosService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    let valorTotal = this.proyecto.totalPuntaje;
    //let valorRadioB = document.querySelector('input[value="inlineRadioOptions"]:checked').value;
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.proyectosService.getProyecto( id )
        .subscribe( (resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });

    }

    //this.cargarCategorias();

   
   
    this.criteriosService.getCriterios()
    .subscribe( criterios => {
     // this.criterios = criterios;

      /*this.criterios.unshift({
        descripcion: '',
        id: ''
      })*/

      // console.log( this.paises );
    });


    /*this.carrerasService.getCarreras()
    .subscribe( carreras => {
      this.carreras = carreras;

      this.carreras.unshift({
        descripcion: '[ Seleccione Carrera]',
        id: ''
      })
     });*/

      // console.log( this.paises );
   
    /*this.disertantesService.get('hospital').valueChanges
        .subscribe( categoriaId => {
          this.categoriaSeleccionadah = this.categorias.find( h => h.id === categoriaId );
        })*/
  }

  /*onclick(prouser){
    this.puntos.push(prouser.value);
    prouser.value
  }*/

  onItemChange(value: CriterioModel){

    //verfificar que no este en el array por el id de criterio remover y colocar nuevamente
    //Eliminar el último elemento de un Array
    //this.puntos.pop

    //AÑADIR el último elemento de un Array 
    //this.puntos.push(value);

    //Añadir un elemento al principio de un Array
    //this.puntos.unshift(value);

    //DESCOMENTAR------------------------------------
    /*let result = this.puntos.filter((item,index)=>{
      return this.puntos.indexOf(item) === index;
    })
    console.log(result); //[1,2,6,5,9,'33']*/

    

    /*for (let index = 0; index < this.puntos.length; index++) {

      if (value.id) {
      
      }
      
  
      
      this.puntos["id"]
    }*/

    
    //console.log(value.puntajeAsignado);

    //console.log(this.puntos);

    //console.log(this.subTotal());
 }

 removerObjeto(value: CriterioModel) {

      //AÑADIR el último elemento de un Array 
      this.puntosTem.push(value);

      //Añadir un elemento al principio de un Array
      //this.puntos.unshift(value);
  
      this.puntos = this.puntosTem.filter((item,index)=>{
        return this.puntosTem.indexOf(item) === index;
      })

      console.log(this.puntos); 
      




      //const sumall = fruits.map(item => item.amount).reduce((prev, curr) => prev + curr, 0);
 }



 subTotal() {
  let suma = 0;

  this.puntos.forEach( function(punto){
    suma    += Number(punto.puntajeAsignado);
  })
  console.log("Suma: ", suma);

  //const suma = this.puntos.map(item => Number(item.puntajeAsignado)).reduce((prev, curr) => prev + curr, 0);
  //console.log(suma);

  //console.log(value.id);

  /*for (let index = 0; index < this.puntos.length; index++) {
    suma += Number(value);

    //this.puntos["id"]
  }*/

  //console.log("La suma es : ", suma);  

 }


  guardar( form: NgForm ) {

    this.subTotal();

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    //this.subTotal(1);

    /*Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });*/

    //Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.proyecto.id ) {
      //se agrega los los crierios en el proyecto sin las alificaciones
      //this.proyecto.evaluadores = this.eva
      peticion = this.proyectosService.actualizarProyecto( this.proyecto );

    } else {
      peticion = this.proyectosService.crearProyecto(this.proyecto );
    }


    peticion.subscribe( resp => {

    /*Swal.fire({
      title: this.carrera.descripcion,
      text: 'Se actualizó correctamente',
      type: 'success'
    });*/

    });

    console.log(form);
    console.log(this.proyecto);

  }


  /*cargarDisertantes() {

    this.disertantesService.getDisertantes()
      .subscribe( (disertantes: DisertanteModel[]) => {
        this.disertantes = disertantes;
      })

  }*/

}
