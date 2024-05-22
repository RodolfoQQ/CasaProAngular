import { Component, Inject, NgModule } from '@angular/core';
import { PedidoFactura } from '../../clieentes/models/PedidoFactura';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-frm-entrega-direccion',
  standalone: true,
  imports: [FormsModule, NgIf,NgFor],
  templateUrl: './frm-entrega-direccion.component.html',
 
})
//recibe   data:dataBindig de Formcomponen opendireccio
export class FrmEntregaDireccionComponent {
  pedidoFactura!: PedidoFactura;

  constructor(public dialog: MatDialogRef<FrmEntregaDireccionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.pedidoFactura=data.dataBinding
  }

  closeDialog(): void {
    this.dialog.close();
    Swal.fire({
      title:"Direccion",
      text:"Se guardo la direccion",
      icon:"success",
      timer: 1000,
     
    })
  }

}
