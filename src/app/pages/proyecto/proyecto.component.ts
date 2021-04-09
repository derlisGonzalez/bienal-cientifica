import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosService } from '../../services/proyectos.service';
import { DisertantesService } from '../../services/disertantes.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  public disertantes: DisertanteModel[] = [];
  //public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();

  constructor( private proyectosService: ProyectosService,
               private disertantesService: DisertantesService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.proyectosService.getProyecto( id )
        .subscribe( (resp: ProyectoModel) => {
          this.proyecto = resp;
          this.proyecto.id = id;
        });

    }

    //this.cargarCategorias();

   
   
    this.disertantesService.getDisertantes()
    .subscribe( disertantes => {
      this.disertantes = disertantes;

      this.disertantes.unshift({
        nombre: '[ Seleccione Disertante]',
        id: ''
      })

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




  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    /*Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });*/

    //Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.proyecto.id ) {
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
