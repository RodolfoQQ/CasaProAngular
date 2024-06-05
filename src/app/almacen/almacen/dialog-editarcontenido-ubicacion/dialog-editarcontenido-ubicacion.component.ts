import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ubicacion } from '../../../clieentes/models/Ubicacion';
import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Producto } from '../../../clieentes/models/Productos';
import { Piso } from '../../../clieentes/models/Piso';
import { ServiceCategoriaService } from '../../../clieentes/service/service-categoria.service';
import { Categoria } from '../../../clieentes/models/Categoria';
import { MatIcon } from '@angular/material/icon';
import { UbicacionServiceService } from '../../../clieentes/service/ubicacion-service.service';

@Component({
  selector: 'app-dialog-editarcontenido-ubicacion',
  standalone: true,
  imports: [NgIf, MatIcon],
  templateUrl: './dialog-editarcontenido-ubicacion.component.html',
  styleUrl: './dialog-editarcontenido-ubicacion.component.css'
})
export class DialogEditarcontenidoUbicacionComponent {

  ubicacion:Ubicacion =new Ubicacion();

  productosDeLasUbicaciones:Ubicacion[]=[]
  productosDePiso:Producto[]=[]
  piso:Piso=new Piso();
  categoria=new Categoria();
  productosporCategoriaDisponibles:Producto[]=[]
  //productosDisponibles:Producto[]=[]

  constructor(@Inject(MAT_DIALOG_DATA) public data:{dataUbicacionAlmacen: Ubicacion,
     dataPiso:Piso
   
    },
    private servicioCategoria:ServiceCategoriaService,
    private serviceUbicacion:UbicacionServiceService,
    private dialofRef:DialogRef<DialogEditarcontenidoUbicacionComponent>
  ) { 
  
  }

  ngOnInit(): void {
    //this.getProductosDisponblies();
    this.filtraCategoriaPorcodigo();
    
  }

  getProductosDisponblies(){
    //mustra el producto selecionado q esta en la ubicacion    
    this.ubicacion = this.data.dataUbicacionAlmacen
    //obtiene los porductos de cada ubicacion
    this.productosDeLasUbicaciones = this.data.dataPiso.ubicacion

    this.productosporCategoriaDisponibles=this.productosporCategoriaDisponibles.filter(
      productoCate=> !this.productosDeLasUbicaciones.some(ubic=>ubic.productos.codProducto===productoCate.codProducto)

    )
  }
/*
  quitalosPorductosYaagregados(){
    this.productos = this.productos.filter(producto =>
      !this.data.piso.ubicacion.some(item => item.productos.codProducto === producto.codProducto)
    );
  }*/

  //filtra la categoria del producto seleccionado
  filtraCategoriaPorcodigo(){
    const codCategoria = this.data.dataUbicacionAlmacen.productos.categoria.codCategoria
    
    this.servicioCategoria.listaPorCategoria(codCategoria).subscribe(
      cata=>{
        //obtiene el nombre de la categoria
        this.categoria=this.data.dataUbicacionAlmacen.productos.categoria,
        //lista los productos por 
        this.productosporCategoriaDisponibles=cata.productos
        console.log("los productos son "+this.productosporCategoriaDisponibles)

        this.getProductosDisponblies()
      }
    )
  }

  remplazarProducto(ubicacion:Number,producto:Number){
    console.log("ubicacion: "+ubicacion)
      this.serviceUbicacion.actualizarProductoOnUbicacion(ubicacion,producto
      ).subscribe(
        ()=>{
          console.log( " producto "+producto)
          alert("Se actualizo el producto"+ this.ubicacion.productos.nombreProducto)
        }
      )

  }
}
