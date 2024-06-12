import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Andamio } from '../models/Andamio';
import { Producto } from '../models/Productos';

@Injectable({
  providedIn: 'root'
})
export class BehaivorSubjectService {

  private productoBehaivor=new  BehaviorSubject<Producto[]>([]);
  productosActualizados$=this.productoBehaivor.asObservable();

  private andamioBehavivor= new BehaviorSubject<Andamio[]>([]);
  andamioActualizado$=this.andamioBehavivor.asObservable()
  actualizaAndamio$: any;

  constructor() { }

  actualizarProducto(productos:Producto[]){
      this.productoBehaivor.next(productos)
  }

  actualizaAndamio(adnamio:Andamio[]){
    this.andamioBehavivor.next(adnamio)
  }

}
