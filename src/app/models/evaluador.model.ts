import { CarreraModel } from "./carrera.model";
import { CriterioModel } from "./criterio.model";


export class EvaluadorModel {

    id: string;
    nombre: string;
    carrera?: CarreraModel;
    criterios?: CriterioModel[]=[];


}

