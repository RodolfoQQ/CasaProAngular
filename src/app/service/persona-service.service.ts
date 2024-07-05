import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientePersona } from '../dahsboard/models/clientePersona';

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
  guardarPersona(cliente: ClientePersona):Observable<ClientePersona> {
    return this.http.post<ClientePersona>(this.urlEnpoit, cliente)/*.pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const mensaje = errorResponse.error.error;
        console.error('Error:', mensaje); // Para depuración en consola
          Swal.fire("error"+mensaje)


        return throwError(() => new Error());
      })
    );*/
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
