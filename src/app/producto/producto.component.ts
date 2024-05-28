import { Component, EventEmitter, Output } from '@angular/core';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { Categoria } from '../clieentes/models/Categoria';
import { ServiceCategoriaService } from '../clieentes/service/service-categoria.service';
import { Producto } from '../clieentes/models/Productos';
import { ServiceProductoService } from '../clieentes/service/service-producto.service';
import { BehaivorSubjectProductoService } from '../clieentes/service/behaivor-subject-producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FormProductoComponent, ],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {


  productos:Producto[]=[]
  productoSelected:Producto =new Producto();
  categorias:Categoria[]=[]

  constructor(private serviceBehaivor:BehaivorSubjectProductoService ,private service:ServiceProductoService,private serviceCategoria:ServiceCategoriaService){
    this.productoSelected.categoria = new Categoria();
  }

  ngOnInit(): void {

    this.serviceCategoria.llenaSelect().subscribe(data=>{
      this.categorias=data
      console.log(this.categorias)

      

    })

    this.service.findallProductos().subscribe(
      data=>{
        this.productos=data
      } )

      this.serviceBehaivor.productosActualizados$.subscribe(data=>{
        this.productos=data
      })
    

  }
  
  
  //@Output() ouputrowProductoEmiter= new EventEmitter();
  onSelectProducto(rowProducto:Producto){

      this.productoSelected={ ...rowProducto}
     // this.ouputrowProductoEmiter.emit(this.productoSelected)
       
  }


  deletedOne(codProd:number){
      this.service.deletebyidProducto(codProd).subscribe()
      this.productos=this.productos.filter(data=>data.codProducto !=codProd)
      //alert("el producto "+codProd+"se ha eliminado")

  }

}



