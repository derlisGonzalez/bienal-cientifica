import { CarreraModel } from './carrera.model';
import { CategoriaModel } from './categoria.model';

export class DisertanteModel {

    id: string;
    nombre?: string;
    carrera?: string;
    categoria?: string;
    
    /*carrera?: CarreraModel;
    categoria?: CategoriaModel;*/

}
