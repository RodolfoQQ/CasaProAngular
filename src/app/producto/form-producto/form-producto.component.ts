import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiceCategoriaService } from '../../clieentes/service/service-categoria.service';
import { Categoria } from '../../clieentes/models/Categoria';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { ServiceProductoService } from '../../clieentes/service/service-producto.service';
import { Producto } from '../../clieentes/models/Productos';
import { BehaivorSubjectProductoService } from '../../clieentes/service/behaivor-subject-producto.service';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css'
})
export class FormProductoComponent {

  @Input() producto:Producto= new Producto();
  //@Output() productoGuardado= new EventEmitter();

  productos:Producto[]=[]
  
  categorias:Categoria[]=[]


  constructor(
    private behaivorProduct:BehaivorSubjectProductoService,private serviceCategoria:ServiceCategoriaService, private serviceProducto:ServiceProductoService){
  this.producto.categoria = new Categoria();
}

  ngOnInit(): void{
    
    this.serviceCategoria.llenaSelect().subscribe(data=>{
      this.categorias=data
      console.log(this.categorias)

    })
    }
    
    addProdcutoRowToForm(){

    }



    guadarProducto():void{
        this.serviceProducto.saveProducto(this.producto).subscribe(
          ()=>{
            this.serviceProducto.findallProductos().subscribe(data=>{
              this.behaivorProduct.actualizarProducto(data)
            })
          }
        )
    }

}
