import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaYempresaServiceService {

  urlEndPoint:string="http://localhost:8080/api/personaYempresa"

  constructor(private http:HttpClient) { }


  //buscar cliente por documento

  findByDniorRuc(rucODni:string):Observable<any>{
    
    return this.http.get<any>(`${this.urlEndPoint}/${rucODni}`)

  }

}
