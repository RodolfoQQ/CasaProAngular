import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Andamio } from '../models/Andamio';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceAlmacenService {  

   url:string = "http://localhost:8080/api/almacen";

  constructor(private http:HttpClient) { }

  listarAndamio():Observable<Andamio[]>{
    
    return this.http.get<Andamio[]>(this.url);
  }


}
