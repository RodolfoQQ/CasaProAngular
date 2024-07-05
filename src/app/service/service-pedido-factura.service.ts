import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { PedidoFactura } from '../dahsboard/models/PedidoFactura';

@Injectable({
  providedIn: 'root'
})


export class ServicePedidoFacturaService {

    url:string="http://localhost:8080/api/pedido"
  constructor(private http:HttpClient) { }

  findall():Observable<PedidoFactura[]>{

    return this.http.get<PedidoFactura[]>(this.url)
  }

  detallePedidos(codPedido:number):Observable<PedidoFactura>{

    return this.http.get<PedidoFactura>(`${this.url}/${codPedido}`)
  }

  updateEstadoPedido(codPedido:number ,pedido:PedidoFactura):Observable<PedidoFactura>{
    return this.http.put<PedidoFactura>(`${this.url}/${codPedido}`,pedido)
  }

  savePedido(pedido: PedidoFactura): Observable<PedidoFactura> {
    return this.http.post<PedidoFactura>(this.url, pedido).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        const errorMessage = errorResponse.error.mensaje || 'Error desconocido';
        Swal.fire('Error', errorMessage, 'error');
        return throwError(() => new Error(errorMessage));
      })
    );
  }



}
