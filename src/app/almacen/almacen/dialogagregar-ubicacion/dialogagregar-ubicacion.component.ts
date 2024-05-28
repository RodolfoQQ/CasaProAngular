import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, NgModule } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { AlmacenComponent } from '../almacen.component';
import { Piso } from '../../../clieentes/models/Piso';
import { ProductoComponent } from '../../../producto/producto.component';
import { ServiceProductoService } from '../../../clieentes/service/service-producto.service';
import { Producto } from '../../../clieentes/models/Productos';
import { ServiceCategoriaService } from '../../../clieentes/service/service-categoria.service';
import { Categoria } from '../../../clieentes/models/Categoria';
import { NgFor } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RowPedido } from '../../../clieentes/models/RowPedido';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Ubicacion } from '../../../clieentes/models/Ubicacion';



@Component({
  selector: 'app-dialogagregar-ubicacion',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgFor, FormsModule,MatIconButton,MatIcon ],
  templateUrl: './dialogagregar-ubicacion.component.html',
  styleUrl: './dialogagregar-ubicacion.component.css'
})

export class DialogagregarUbicacionComponent {

  productos: Producto[]=[];
  codCategoria!:number ;
  //productos: Producto=new Producto();
 
  categorias:Categoria[]=[]
  nuebaUbicacion= new Ubicacion;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{piso:Piso},public dialog:MatDialog,
   private serviceProducto:ServiceProductoService, private serviceCategoria:ServiceCategoriaService ){
   //  this.productos.categoria =new Producto
  }

  ngOnInit(): void {
   this.llenaSelectCategoria();
    this.quitalosPorductosYaagregados();
 
  }

  dialigProducto(){
    this.dialog.open(ProductoComponent)
  }



  llenaSelectCategoria(){
   
    this.serviceCategoria.llenaSelect().subscribe(
      data=>{
        this.categorias=data

      }
    )
  }

  //compara las los dos listas de las tablas y solo muestra en lalista productos los q no ha sido agregados
  quitalosPorductosYaagregados(){
    this.productos = this.productos.filter(producto =>
      !this.data.piso.ubicacion.some(item => item.productos.codProducto === producto.codProducto)
    );
  }

  listaPorCategoria(){
       this.serviceCategoria.listaPorCategoria(this.codCategoria).subscribe(
      data => {
        this.productos = data.productos
        //elimina de la lista los productos q ya estan en la lista
        this.quitalosPorductosYaagregados()
        
        //console.log(JSON.stringify(this.productos)); // Verifica que los datos se están recibiendo correctamente
      },
    
    );
  }

  quitarProdcuto(producto:Producto){
    console.log(producto.codProducto)
    let productoYaexiste =this.data.piso.ubicacion.find(p=>p.productos.codProducto===producto.codProducto)
    if(productoYaexiste){
      console.log("existe el produto")
      this.data.piso.ubicacion=this.data.piso.ubicacion.filter(
        p=>p.productos.codProducto!==producto.codProducto
      
      )
     
      this.productos.push(producto)
      
    }
  }

  addtoListapiso(producto:Producto){
    
    console.log(producto.codProducto)
    
     this.nuebaUbicacion= new Ubicacion;
      this.nuebaUbicacion.productos=producto
      this.data.piso.ubicacion.push(this.nuebaUbicacion)
      //evalua si en productosexistetes ya esta añadido
      let productoYaexiste =this.productos.find(p=>p.codProducto===producto.codProducto)
      
      //quita de la lista de productos el producto añadido para q no se vuelba a añadir
      if(productoYaexiste){
        this.productos=this.productos.filter(
          p=>p.codProducto !==producto.codProducto
        )
      }
      
  }

  
}
