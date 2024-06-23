import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../dahsboard/models/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ServiceCategoriaService {

  url:string="http://localhost:8080/api/categoria"

  constructor(private http:HttpClient) { }

  llenaSelect():Observable<Categoria[]>{

    return this.http.get<Categoria[]>(this.url);
  }

  listaPorCategoria(codCategoria:number):Observable<Categoria>{
    return this.http.get<Categoria>(`${this.url}/${codCategoria}`)
  }


}
