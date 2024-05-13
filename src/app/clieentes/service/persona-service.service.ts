import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientePersona } from '../models/clientePersona';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private urlEnpoit:string="http://localhost:8080/api/persona";

    constructor(private http: HttpClient) { }

   findallPersonas():Observable<ClientePersona[]>{
      
    return this.http.get<ClientePersona[]>(this.urlEnpoit)/*.pipe(
      map(respose=>respose as ClientePersona[])

    );*/

  }

  guardarPersona(cliente:ClientePersona){

    return this.http.post(this.urlEnpoit,cliente)
  }

  updatePersona(cliente:ClientePersona):Observable<ClientePersona>{
    return this.http.put<ClientePersona>(`${this.urlEnpoit}/${cliente.codpersona}`,cliente)
  }

  deletePersonabyId(codPersona:number):Observable<void>{

    return this.http.delete<void>(`${this.urlEnpoit}/${codPersona}`)
  }

  findbyDni(dni:string):Observable<ClientePersona>{
    
    return this.http.get<ClientePersona>(`${this.urlEnpoit}/${dni}`)

  }


}
