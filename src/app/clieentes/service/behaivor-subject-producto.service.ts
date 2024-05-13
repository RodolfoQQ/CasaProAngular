import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Producto } from '../models/Productos';

@Injectable({
  providedIn: 'root'
})
export class BehaivorSubjectProductoService {

  private productoBehaivor=new  BehaviorSubject<Producto[]>([]);
  productosActualizados$=this.productoBehaivor.asObservable();

  constructor() { }

  actualizarProducto(productos:Producto[]){  
      this.productoBehaivor.next(productos)
  }

}
