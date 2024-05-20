import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PedidoFactura } from '../clieentes/models/PedidoFactura';
import { ServicePedidoFacturaService } from '../clieentes/service/service-pedido-factura.service';
import { MatButton } from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';

@Component({
  selector: 'app-entregapedido',
  standalone: true,
  imports: [MatIconModule, MatButton,MatButtonModule, MatDialogModule],
  templateUrl: './entregapedido.component.html',
  styleUrl: './entregapedido.component.css'
})
export class EntregapedidoComponent {
  
  //pedidofactura:PedidoFactura=new PedidoFactura();
  pedidos:PedidoFactura[]=[]
  modal:boolean=false;

  constructor(private servicePedidoFactura:ServicePedidoFacturaService, public dialog:MatDialog) { 
    
  }

  ngOnInit(): void {
     this.listarPedidos();
  }

    openDialog(codPedido:number){
      const dialog=this.dialog.open(DetallePedidoComponent,{
         width:'500px',
         height:'500px',
         data:{codPedido: codPedido}
      });
        
    }

    listarPedidos(){
    this.servicePedidoFactura.findall().subscribe(
      data=>{
        this.pedidos=data
      }
    )
  }
    

    

}

  

 
