import { Component, OnInit } from '@angular/core';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';

@Component({
  selector: 'app-evaluadores',
  templateUrl: './evaluadores.component.html',
  styleUrls: ['./evaluadores.component.css']
})
export class EvaluadoresComponent implements OnInit {

  evaluadores: EvaluadorModel[] = [];
  cargando = false;

  constructor( private evaluadoresService: EvaluadoresService ) { }

  ngOnInit()  {

    this.cargando = true;
    this.evaluadoresService.getEvaluadores()
      .subscribe( resp => {
        console.log(resp);
        this.evaluadores = resp;
        this.cargando = false;
      });
  }


  borrarEvaluador( evaluador: EvaluadorModel, i: number ) {

    /*Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ carrera.descripcion }`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {*/

      //if ( resp.value ) {
        this.evaluadores.splice(i, 1);
        this.evaluadoresService.borrarEvaluador( evaluador.id ).subscribe();
      //}

    //});

  }
}
