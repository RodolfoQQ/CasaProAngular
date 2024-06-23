import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { ServicePedidoFacturaService } from '../../service/service-pedido-factura.service';
import { PedidoFactura } from '../models/PedidoFactura';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './detalle-pedido.component.html',
  styleUrl: './detalle-pedido.component.css'
})
export class DetallePedidoComponent {
  pedido:PedidoFactura = new PedidoFactura();

  constructor(@Inject(MAT_DIALOG_DATA)public data:{codPedido:number}, private servicePedidoFactura: ServicePedidoFacturaService ){

  }
  ngOnInit(): void {
    this.detallePedidoFactura();
  }

  detallePedidoFactura(){
    this.servicePedidoFactura.detallePedidos(this.data.codPedido).subscribe(data=>{
      this.pedido=data
    })
  }

}
