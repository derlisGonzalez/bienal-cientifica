import { Component, OnInit } from '@angular/core';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';

@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.css']
})
export class EvaluadorComponent implements OnInit {

  public carreras: CarreraModel[] = [];
  public carreraSeleccionada: CarreraModel;

  evaluador: EvaluadorModel = new EvaluadorModel();

  constructor( private evaluadoresService: EvaluadoresService,
               private carrerasService: CarrerasService,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.evaluadoresService.getEvaluador( id )
        .subscribe( (resp: EvaluadorModel) => {
          this.evaluador = resp;
          this.evaluador.id = id;
        });

    }



    this.carrerasService.getCarreras()
    .subscribe( carreras => {
      this.carreras = carreras;

      this.carreras.unshift({
        descripcion: '[ Seleccione Carrera]',
        id: ''
      })

      // console.log( this.paises );
    });
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

    if ( this.evaluador.id ) {
      peticion = this.evaluadoresService.actualizarEvaluador( this.evaluador );
    } else {
      peticion = this.evaluadoresService.crearEvaluador( this.evaluador );
    }


    peticion.subscribe( resp => {

    /*Swal.fire({
      title: this.carrera.descripcion,
      text: 'Se actualizó correctamente',
      type: 'success'
    });*/

    });

    console.log(form);
    console.log(this.evaluador);

  }


  /*cargarCarreras() {

    this.carrerasService.getCarreras()
      .subscribe( (carreras: CarreraModel[]) => {
        this.carreras = carreras;
      })

  }*/
}
