import { Component } from '@angular/core';
import { FormPedidoComponent } from './form-pedido/form-pedido.component';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [FormPedidoComponent],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {

}
