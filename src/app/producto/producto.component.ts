import { Component } from '@angular/core';
import { Categoria } from '../clieentes/models/Categoria';
import { Producto } from '../clieentes/models/Productos';
import { BehaivorSubjectService } from '../clieentes/service/behaivor-subject-producto.service';
import { ServiceCategoriaService } from '../clieentes/service/service-categoria.service';
import { ServiceProductoService } from '../clieentes/service/service-producto.service';
import { FormProductoComponent } from './form-producto/form-producto.component';

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

  constructor(private serviceBehaivor:BehaivorSubjectService ,private service:ServiceProductoService,private serviceCategoria:ServiceCategoriaService){
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



