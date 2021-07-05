import { Component, OnInit } from '@angular/core';
import { DisertanteModel } from '../../models/disertante.model';
import { ProyectoModel } from '../../models/proyecto.model';
import { ProyectosService } from '../../services/proyectos.service';
import { DisertantesService } from '../../services/disertantes.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CriteriosService } from 'src/app/services/criterios.service';
import { CriterioModel } from 'src/app/models/criterio.model';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  forma: FormGroup;

  
  public criterios: CriterioModel[] = [];
  public disertantes: DisertanteModel[] = [];
  //public carreras: CarreraModel[] = [];
  public disertanteSeleccionado: DisertanteModel;
  //public carreraSeleccionada: CarreraModel;
  proyecto: ProyectoModel = new ProyectoModel();
  

  constructor( private fb: FormBuilder,
               private proyectosService: ProyectosService,
               private criteriosService: CriteriosService,
               private disertantesService: DisertantesService,
               private route: ActivatedRoute) { 

                this.crearFormulario();
                //this.criteriosService.getCriterios();

               }

  ngOnInit() {

    
    let valorTotal = this.proyecto.totalPuntaje;
    const id = this.route.snapshot.paramMap.get('id');

    
    //console.log(this.criterios.values);
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

    this.criteriosService.getCriterios()
    .subscribe( criterios => {
      if(!this.proyecto.id){
        this.proyecto.criterios = criterios
        this.setValorDefault(this.proyecto)
      }
      //this.setValorDefault(this.proyecto) // crear un valor default para puntajeAsignado
                                          // puede ser opcional porque
                                          //se puede guardar sin el valor y cargar unicamente en la hora de 
                                          //calificar ya que el modelo de la base de datos es flexible
    

      /*this.criterios.unshift({
        descripcion: '',
        id: ''
      })*/

      console.log( this.criterios );
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
  
  
  /*mostrarListado(){
    var lista='';
    for(var i=0; i<jugadores.length; i++){
      lista+= 'id: ' + jugadores[i].id +
        ' nombre: ' + jugadores[i].name + 
        ' edad: ' + jugadores[i].edad + 
        ' dinero: ' + jugadores[i].dinero + '\n';
    }
    document.getElementById('listado').innerText = lista;
  }*/

  setValorDefault(proyecto: ProyectoModel){
    proyecto.criterios.forEach(criterio => {
      criterio.puntajeAsignado = 0
    });
  }

  setValorTotal(proyecto: ProyectoModel){
    
  }

  crearFormulario() {
    this.forma = this.fb.group({
      id  : ['', Validators.required ],
      titulo  : ['', Validators.required ],
      codigo: ['', [Validators.required, Validators.minLength(5) ] ],
      disertante  : ['' ],
      cuerpo  : ['', [ Validators.required, Validators.minLength(50) ]  ],
      //email  : ['', [ Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')] ],
      //usuario : ['', , this.validadores.existeUsuario ],
      //pass1   : ['', Validators.required ],
      //pass2   : ['', Validators.required ],
     /* criterios: this.fb.group({

        el_expositor_seadecua_al_tiempo_estipulado: this.fb.group({
          p1: [0, Validators.required ],
          p2: [0, Validators.required ],
          p3: [0, Validators.required ],
        }),
        

      }),
      criterioss: this.fb.array([
        
       
        
        this.initCriterios()
        
      ]),*/
      //pasatiempos: this.fb.array([])
    },{
      //validators: this.validadores.passwordsIguales('pass1','pass2')
    });

  }

  initCriterios() {
    return this.fb.group({
      name: ['', Validators.required],
      manufacturerName: ['', Validators.required]
    })
  }


  guardar( ) {

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

    console.log();
    console.log(this.proyecto);
    console.log(this.forma);

  }




  // guardar( form: NgForm ) {

  //   if ( form.invalid ) {
  //     console.log('Formulario no válido');
  //     return;
  //   }

  //   /*Swal.fire({
  //     title: 'Espere',
  //     text: 'Guardando información',
  //     type: 'info',
  //     allowOutsideClick: false
  //   });*/

  //   //Swal.showLoading();

  //   let peticion: Observable<any>;

  //   if ( this.proyecto.id ) {
  //     peticion = this.proyectosService.actualizarProyecto( this.proyecto );
  //   } else {
  //     peticion = this.proyectosService.crearProyecto(this.proyecto );
  //   }


  //   peticion.subscribe( resp => {

  //   /*Swal.fire({
  //     title: this.carrera.descripcion,
  //     text: 'Se actualizó correctamente',
  //     type: 'success'
  //   });*/

  //   });

  //   console.log(form);
  //   console.log(this.proyecto);
  //   console.log(this.forma);

  // }


  /*cargarDisertantes() {

    this.disertantesService.getDisertantes()
      .subscribe( (disertantes: DisertanteModel[]) => {
        this.disertantes = disertantes;
      })

  }*/

}
