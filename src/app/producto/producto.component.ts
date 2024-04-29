import { Component } from '@angular/core';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormProductoComponent, ListadoProductosComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
 accion:string="accciones";
}
