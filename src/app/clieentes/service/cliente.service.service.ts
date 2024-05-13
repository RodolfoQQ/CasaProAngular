import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteServiceService {

   private urlendpont: string='http://localhost:8080/api/clienteEmpresa';

  constructor(private http: HttpClient) { }

  clientes:Cliente[]=[{
    codEmpresa:0,
    nombre:'rod',
    ruc:'123',
    direccion:'asasas',
    telefono:'12312',
    correo:'1321ssx'
    

  }]

    findall():Observable<Cliente[]>{
   
      return this.http.get<Cliente[]>(this.urlendpont)/*.pipe(
      map((response: any) => response._embedded.clientes as Cliente[]),
     
      
    ) */
     
      }

      /*findallOf():Observable<Cliente[]>{
        return of(this.clientes)
      }*/

      create(cliente:Cliente):Observable<Cliente>{

        return this.http.post<Cliente>(this.urlendpont,cliente)
      }

      update(cliente:Cliente):Observable<Cliente>{
        return this.http.put<Cliente>(`${this.urlendpont}/${cliente.codEmpresa}`,cliente)

      }

      deleted(codempresa:number):Observable<void>{

        return this.http.delete<void>(`${this.urlendpont}/${codempresa}`)
      }
      

      findbyRuc(ruc:string):Observable<Cliente>{

        return this.http.get<Cliente>(`${this.urlendpont}/${ruc}`)
      }

}
