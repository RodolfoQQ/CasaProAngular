import { Categoria } from "./Categoria";
import { Ubicacion } from "./Ubicacion";

export class Producto{
    codProducto!:number;
    categoria!:Categoria;
    nombreProducto!:string;
    descripcion!:string;
    ubicacion!:Ubicacion;
}