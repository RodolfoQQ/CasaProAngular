import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DtoAddDetalleubicacion } from '../dahsboard/models/DtoAddDetalleubicacion';
import { DetalleUbicaion } from '../dahsboard/models/detalleUbicacion';

@Injectable({
  providedIn: 'root'
})
export class DetalleubicacionService {

  url:string='http://localhost:8080/api/detalleubicacion'


  urlDto:string='http://localhost:8080/api/dtodetalle'

  constructor(private http:HttpClient) { }

    listardetalledeubicacion():Observable<DetalleUbicaion[]>{
        return this.http.get<DetalleUbicaion[]>(this.url)
    }

    finddetalledeubicacion(codDetalleub:number):Observable<DetalleUbicaion>{
      return this.http.get<DetalleUbicaion>(`${this.url}/${codDetalleub}`)
    }

    // luego de actualizar un prodcuto lista los andamios por el emtodo pipi
    remplazarProducto(codDetalle:number,codProdcuto:number):Observable<DetalleUbicaion>{
      return this.http.put<DetalleUbicaion>(`${this.url}/${codDetalle}/${codProdcuto}`,{})
    }

    getdDTOetalleDisponibles(codcategoria:number):Observable<DtoAddDetalleubicacion[]> {
      return this.http.get<DtoAddDetalleubicacion[]>(`${this.urlDto}/${codcategoria}`)
    }

    agregarDetalleaubicacionvacia(codubicacion:number, coddetalleub:number):Observable<string>{
      return this.http.put<string>(`${this.urlDto}/${codubicacion}/${coddetalleub}`,null)
    }



}
