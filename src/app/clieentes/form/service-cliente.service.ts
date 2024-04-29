import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
}

)
export class ServiceClienteService {

  //private urloEndPoint:String='http://localhost/api/cliente';

  constructor(private http:HttpClient) { }
/*
 getCliente(): Observable<Cliente>[]{

 } */


}
