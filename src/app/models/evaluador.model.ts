import { CriterioModel } from "./criterio.model";


export class EvaluadorModel {

    id: string;
    nombre: string;
    carrera?: string;
    //lista de criterios
    criterios?: CriterioModel[];


}

