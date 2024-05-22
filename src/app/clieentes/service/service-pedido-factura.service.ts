import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoFactura } from '../models/PedidoFactura';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class ServicePedidoFacturaService {

    url:string="http://localhost:8080/api/pedido"
  constructor(private http:HttpClient) { }

  savePedido(pedido:PedidoFactura):Observable<PedidoFactura>{

    return this.http.post<PedidoFactura>(this.url,pedido);
  }

  findall():Observable<PedidoFactura[]>{

    return this.http.get<PedidoFactura[]>(this.url)
  }
  
  detallePedidos(codPedido:number):Observable<PedidoFactura>{
    
    return this.http.get<PedidoFactura>(`${this.url}/${codPedido}`)
  }

  updateEstadoPedido(codPedido:number ,pedido:PedidoFactura):Observable<PedidoFactura>{
    return this.http.put<PedidoFactura>(`${this.url}/${codPedido}`,pedido)
  }

}
