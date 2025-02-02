import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Piso } from '../dahsboard/models/Piso';

@Injectable({
  providedIn: 'root'
})
export class ServicePisoService {

  url:string='http://localhost:8080/api/piso'
  constructor(private http:HttpClient) { }

  saveInformaciondePiso(piso:Piso):Observable<Piso>{
    return this.http.post<Piso>(this.url,piso)
  }

}
