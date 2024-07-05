import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { ServicePedidoFacturaService } from '../../service/service-pedido-factura.service';
import { DetallePedidoComponent } from '../detalle-pedido/detalle-pedido.component';
import { PedidoFactura } from '../models/PedidoFactura';

@Component({
  selector: 'app-entregapedido',
  standalone: true,
  imports: [MatIconModule, MatButton,MatButtonModule,NgIf, MatDialogModule],
  templateUrl: './entregapedido.component.html',
  styleUrls: ['./entregapedido.component.css','./estilostabla.css']

})
export class EntregapedidoComponent {


  pedidos:PedidoFactura[]=[]
  modal:boolean=false;
  selectedPedido:PedidoFactura =new PedidoFactura();

  constructor(private servicePedidoFactura:ServicePedidoFacturaService, public dialog:MatDialog) {

  }

  ngOnInit(): void {
     this.listarPedidos();
  }

    openDialog(codPedido:number){
      const dialog=this.dialog.open(DetallePedidoComponent,{
         width:'700px',
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


  //obtiene el valor el array de la tabla y lo asigna al objeto selectedPedido
  updateEstado(pedidoFactura:PedidoFactura){
    this.selectedPedido={ ...pedidoFactura}

    Swal.fire({
      title: '¿Estás seguro de actualizar el estado del pedido?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, Actualizar'
    }).then((result) => {
      if (result.isConfirmed) {
       //recibe el codigo del producto y el cuerpo
        this.servicePedidoFactura.updateEstadoPedido(pedidoFactura.codPedido,this.selectedPedido).subscribe(()=>{
          this.listarPedidos()

        })

      }
    });



  }




}




