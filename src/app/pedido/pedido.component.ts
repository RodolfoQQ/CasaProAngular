import { Component } from '@angular/core';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';
import { NgFor, NgIf } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../clieentes/models/cliente';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormPedidoComponent, NgIf,MatButtonModule, MatIconModule, MatDialogModule, NgFor ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
 
  
  cliente:Cliente =new Cliente();
  
  constructor() { }
  ngOnInit(): void {
   
    this.cliente;
  }

  mostracliente(clie:any){
   // this.cliente=clie;
    this.cliente= clie as Cliente;

    console.log(clie+ " dato any");
    console.log(JSON.stringify(this.cliente)+"infoo");
    //console.log(" cliente : " +JSON.stringify(this.cliente) )


  }
}
