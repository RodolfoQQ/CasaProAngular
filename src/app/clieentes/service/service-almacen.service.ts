import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Andamio } from '../models/Andamio';
import { DTODetallessinubicacion } from '../models/DTODetallessinubicacion';

@Injectable({
  providedIn: 'root'
})
export class ServiceAlmacenService {

   url:string = "http://localhost:8080/api/almacen";

  constructor(private http:HttpClient) { }

  listarAndamio():Observable<Andamio[]>{

    return this.http.get<Andamio[]>(this.url);
  }

  listaDEtallesSinubicacion():Observable<DTODetallessinubicacion[]>{
    return this.http.get<DTODetallessinubicacion[]>(`${this.url}/detallessinubicacion`)
  }

  actualizaDetallenVacio(codetalleUbcacion:number):Observable<string>{
    return this.http.put<string>(`${this.url}/${codetalleUbcacion}`,null)
  }
  agregarAndamio():Observable<Andamio>{
      return this.http.post<Andamio>(this.url,null)

  }
  eliminarAndamioyRelaciones(codandamio:number){
    return this.http.delete(`${this.url}/${codandamio}`)
  }



}
