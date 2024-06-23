
import { Component } from '@angular/core';
import { MaterialModule } from '../../material-module/material-module.module';
import { Cliente } from '../models/cliente';



@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [MaterialModule],
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
