import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../clieentes/models/Categoria';
import { Producto } from '../../clieentes/models/Productos';
import { BehaivorSubjectService } from '../../clieentes/service/behaivor-subject-producto.service';
import { ServiceCategoriaService } from '../../clieentes/service/service-categoria.service';
import { ServiceProductoService } from '../../clieentes/service/service-producto.service';

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
    private behaivorProduct:BehaivorSubjectService,private serviceCategoria:ServiceCategoriaService, private serviceProducto:ServiceProductoService){
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
