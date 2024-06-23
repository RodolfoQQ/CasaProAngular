import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../dahsboard/models/Productos';

@Injectable({
  providedIn: 'root'
})
export class ServiceProductoService {

  url:string = 'http://localhost:8080/api/producto';

  constructor(private http:HttpClient) { }

  findallProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(this.url);
  }

  findProductoById(codProducto:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/${codProducto}`)
  }

  saveProducto(producto: Producto) :Observable<Producto>{
    return this.http.post<Producto>(this.url,producto)
  }

  deletebyidProducto(codProducto:number):Observable<void>{
      return this.http.delete<void>(`${this.url}/${codProducto}`)
  }

  filtrarProductos(term:string):Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.url}/filtrar/${term}`)
  }

  actualizarProducto(prodcuto:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.url}/${prodcuto.codProducto}`,prodcuto)
  }

//evaluar este metodo a borrar ya q el filtrar sera por medio de la colesccion de prodcutos   q tiene categoria
  filtrarProCategoria(codCategoria:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.url}/${codCategoria}`)
  }



}
