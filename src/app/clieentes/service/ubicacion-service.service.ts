import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ubicacion } from '../models/Ubicacion';

@Injectable({
  providedIn: 'root'
})
export class UbicacionServiceService {

  url:string='http://localhost:8080/api/ubicacion'

  constructor(private http:HttpClient) { }

  eliminarUbicacionConProducto(codubicacion:number):Observable<void>{
    return this.http.delete<void>(`${this.url}/${codubicacion}`)

  }
  
  actualizarProductoOnUbicacion(codUbicacion:Number, codProducto:Number):Observable<Ubicacion>{

    return this.http.put<Ubicacion>(`${this.url}/${codUbicacion}/${codProducto}`,{})
  }


}
