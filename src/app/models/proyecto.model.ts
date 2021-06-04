import { CriterioModel } from "./criterio.model";
import { EvaluadorModel } from "./evaluador.model";

export class ProyectoModel {

    id: string;
    codigo?: string;
    titulo?: string;
    cuerpo?: string;
    autor?: string;
    autor2?: string;
    estado?: boolean = false;

    //lista de evaluadores
    //se agraga uno o mas evaluadores
    evaluadores?: EvaluadorModel[];

   // criterios?: CriterioModel[];
    criterios?: string; // se crea un array para cargar todos los criterios
    

}