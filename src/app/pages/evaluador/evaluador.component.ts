import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EvaluadorModel } from '../../models/evaluador.model';
import { EvaluadoresService } from '../../services/evaluadores.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarreraModel } from 'src/app/models/carrera.model';
import { CarrerasService } from 'src/app/services/carreras.service';
import { CriterioModel } from 'src/app/models/criterio.model';
import { CriteriosService } from 'src/app/services/criterios.service';

@Component({
  selector: 'app-evaluador',
  templateUrl: './evaluador.component.html',
  styleUrls: ['./evaluador.component.css']
})
export class EvaluadorComponent implements OnInit {

  public carreras: CarreraModel[] = [];
  public carrera: CarreraModel = new CarreraModel;
  public criterios: CriterioModel[] = [];
  evaluador: EvaluadorModel = new EvaluadorModel();

  constructor(private evaluadoresService: EvaluadoresService,
    private criteriosService: CriteriosService,
    private carrerasService: CarrerasService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'nuevo') {
      this.evaluadoresService.getEvaluador(id)
        .subscribe((resp: EvaluadorModel) => {
          this.evaluador = resp;
          delete this.evaluador.carrera.evaluadores
          this.evaluador.id = id;
        });
    }

    this.carrerasService.getCarreras()
      .subscribe(carreras => {
        this.carreras = carreras;
        this.carreras.unshift({
          descripcion: '[ Seleccione Carrera]',
          id: ''
        })
        console.log(this.carreras);
      });

    console.log(this.criterios.values);

    this.criteriosService.getCriterios()
      .subscribe(criterios => {
        if (!this.evaluador.id) {
          this.evaluador.criterios = criterios
          this.setValorDefault(this.evaluador)
        }
        //this.setValorDefault(this.proyecto) // crear un valor default para puntajeAsignado
        // puede ser opcional porque
        //se puede guardar sin el valor y cargar unicamente en la hora de 
        //calificar ya que el modelo de la base de datos es flexible
        console.log(this.evaluador.criterios);
      });
  }

  setValorDefault(evaluador: EvaluadorModel) {
    evaluador.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }

  guardar(form: NgForm) {
    if (form.invalid) {
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
    this.evaluador.carrera = this.carrera
    if (this.evaluador.id) {
      peticion = this.evaluadoresService.actualizarEvaluador(this.evaluador);
    } else {
      peticion = this.evaluadoresService.crearEvaluador(this.evaluador);
    }
    peticion.subscribe(resp => {
      this.actualizarCarrera(this.carrera, this.evaluador)
      console.log(resp)
      /*Swal.fire({
        title: this.carrera.descripcion,
        text: 'Se actualizó correctamente',
        type: 'success'
      });*/
    });
  }

  actualizarCarrera(carrera: CarreraModel, evaluador: EvaluadorModel) {
    let newEvaluador = Object.assign({}, evaluador)
    let newCarrera = Object.assign({},carrera)
    delete newEvaluador.carrera
    delete newEvaluador.criterios
    if(newCarrera.evaluadores == undefined){
       newCarrera.evaluadores = []
    }
    if (newCarrera.evaluadores.some(({id}) => id == evaluador.id)){
      newCarrera.evaluadores.forEach((e,index)=>{
        if(e.id == newEvaluador.id) newCarrera.evaluadores.splice(index,1)
      });
    }
    
    newCarrera.evaluadores.push(newEvaluador)
    let response = this.carrerasService.actualizarCarera(newCarrera)
    response.subscribe(resp =>{
      console.log(resp)
    })
  }
  /*cargarCarreras() {
    this.carrerasService.getCarreras()
      .subscribe( (carreras: CarreraModel[]) => {
        this.carreras = carreras;
      })
  }*/
}