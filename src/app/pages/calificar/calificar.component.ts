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

  puntos: number[] = [];
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
 

  onItemChange(value){
    this.puntos.push(Number(value));
    console.log(value);

    console.log(this.puntos);
 }

 subTotal() {
  let suma = 0;
  for (let index = 0; index < this.puntos.length; index++) {
    suma += this.puntos[index];
  }
 

  console.log("La suma es : ", suma);  

 }


  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    this.subTotal();
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
