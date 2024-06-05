import { Dialog, DialogRef } from '@angular/cdk/dialog';
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
import { ServicePisoService } from '../../../clieentes/service/service-piso.service';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';
import swal from 'sweetalert';





@Component({
  selector: 'app-dialogagregar-ubicacion',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, NgFor, FormsModule,MatIconButton,MatIcon ],
  templateUrl: './dialogagregar-ubicacion.component.html',
  styleUrl: './dialogagregar-ubicacion.component.css'
})

export class DialogagregarUbicacionComponent {

  productos: Producto[]=[];
  //parametro para selecionar categoria del select
  codCategoria!:number ;
  //productos: Producto=new Producto();
 
  categorias:Categoria[]=[]
  nuebaUbicacion= new Ubicacion;

  constructor(
    private dialofRef:DialogRef<DialogagregarUbicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{piso:Piso},public dialog:MatDialog,
   private serviceProducto:ServiceProductoService,
   private serviceCategoria:ServiceCategoriaService,
   private pisoService:ServicePisoService){
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

  //compara las los dos listas de las tablas y solo muestra en la lista productos los q no ha sido agregados
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

  guardarInfomacionEnpiso(){
    this.pisoService.saveInformaciondePiso(this.data.piso).subscribe(
      ()=>{
        swal("Good job!", 
        "You clicked the button!",
        
         "success").then(()=>{
           this.dialofRef.close();
         })
       },
      
       
       
    );
  }


  
}
