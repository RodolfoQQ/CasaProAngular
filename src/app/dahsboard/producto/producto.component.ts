import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material-module/material-module.module';
import { BehaivorSubjectService } from '../../service/behaivor-subject-producto.service';
import { ServiceCategoriaService } from '../../service/service-categoria.service';
import { ServiceProductoService } from '../../service/service-producto.service';
import { Categoria } from '../models/Categoria';
import { Producto } from '../models/Productos';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [ MaterialModule, FormsModule,
    NgFor,
    NgIf],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {

  producto:Producto= new Producto();
  //@Output() productoGuardado= new EventEmitter();
  codCategoria!:number;
  productos:Producto[]=[]

  categorias:Categoria[]=[]

  //productos:Producto[]=[]
  productoSelected:Producto =new Producto();
  //categorias:Categoria[]=[]

  constructor(
    private behaivorProduct:BehaivorSubjectService, private serviceProducto:ServiceProductoService,
    private serviceBehaivor:BehaivorSubjectService ,private service:ServiceProductoService,private serviceCategoria:ServiceCategoriaService){
    this.productoSelected.categoria = new Categoria();
    this.producto.categoria = new Categoria();
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
    this.producto.codProducto=this.productoSelected.codProducto
    this.producto.nombreProducto=this.productoSelected.nombreProducto
    this.producto.categoria.codCategoria=this.productoSelected.categoria.codCategoria
    this.producto.descripcion=this.productoSelected.descripcion


  }
/*
actualizarProducto(productoaactualzido:Producto){
 this.producto=productoaactualzido

  this.serviceProducto.actualizarProducto(this.producto).subscribe(

  )
}*/


  deletedOne(codProd:number){
      this.service.deletebyidProducto(codProd).subscribe(
        ()=>{
          alert("se elimino el producto")
        }
      )
      this.productos=this.productos.filter(data=>data.codProducto !=codProd)
      //alert("el producto "+codProd+"se ha eliminado")

  }

  guadarProducto():void{
    if(this.producto.codProducto>0){
        this.serviceProducto.actualizarProducto(this.producto).subscribe(
            ()=>{
              this.serviceProducto.findallProductos().subscribe(data=>{
                this.behaivorProduct.actualizarProducto(data)

              })
            }
        )

    }else{
      this.serviceProducto.saveProducto(this.producto).subscribe(
        ()=>{
          this.serviceProducto.findallProductos().subscribe(data=>{
            this.behaivorProduct.actualizarProducto(data)
          this.producto.nombreProducto="";
          this.producto.descripcion="";
          this.producto.categoria.codCategoria=0;
          })
        }

      )
    }

}


}



