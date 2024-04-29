import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';  
import {MatDialog} from '@angular/material/dialog'; 

import { ListadoProductosComponent } from '../../producto/listado-productos/listado-productos.component';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [NgIf,MatButtonModule, MatIconModule, MatDialogModule,ListadoProductosComponent ],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.css'
})
export class FormPedidoComponent {
  accion:string="accciones";
  habilitarDireccion:boolean=true;
  detalleporMayor:boolean=true;

  constructor(public dialog:MatDialog){

  }

  openVerlistadoProductos(){
    this.dialog.open(ListadoProductosComponent,{
      width:'200%',
      height:'50%'
    });
  }
 



  
}
