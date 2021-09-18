import { CategoriaModel } from "./categoria.model";
import { CarreraModel } from "./carrera.model";
export class UsuarioModel {
    public nombre: string;
    public documento: string;
    public password?: string;
    public categoria?: CategoriaModel;
    public carrera?: CarreraModel;
    public rol?: string;
    public uid?: string;
    constructor( ) {}


}


/*
export class ProyectoModel {

    id: string;
    codigo?: string;
    titulo?: string;
    cuerpo?: string;
    autor?: string;
    autor2?: string;
    estado?: boolean = false;
    totalPuntaje?: number;
    evaluador1?: string[];
    evaluador2?: string;
    evaluador3?: string;

    //lista de evaluadores
    //se agraga uno o mas evaluadores
    evaluadores?: EvaluadorModel[];

    criterios?: CriterioModel[];
    //criterios?: string; // se crea un array para cargar todos los criterios
    

}*/