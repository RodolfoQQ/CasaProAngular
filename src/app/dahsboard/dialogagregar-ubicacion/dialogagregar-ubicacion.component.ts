import { DialogRef } from '@angular/cdk/dialog';
import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { DetalleubicacionService } from '../../service/detalleubicacion.service';
import { ServiceCategoriaService } from '../../service/service-categoria.service';
import { ServicePisoService } from '../../service/service-piso.service';
import { ServiceProductoService } from '../../service/service-producto.service';
import { Categoria } from '../models/Categoria';
import { Piso } from '../models/Piso';
import { Producto } from '../models/Productos';
import { Ubicacion } from '../models/Ubicacion';
import { ProductoComponent } from '../producto/producto.component';





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
  //productosOnDetalleUbi:DetalleUbicaion[]=[]

  ////////////////////////////////////////////////////
  //productos: Producto=new Producto();

  categorias:Categoria[]=[]
  nuebaUbicacion= new Ubicacion;

  constructor(
    private dialofRef:DialogRef<DialogagregarUbicacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:{piso:Piso},public dialog:MatDialog,
   private serviceProducto:ServiceProductoService,
   private serviceCategoria:ServiceCategoriaService,
   private servideDetalleUbicacion:DetalleubicacionService,
   private pisoService:ServicePisoService){
   //  this.productos.categoria =new Producto
  }

  ngOnInit(): void {


   console.log("datos de ubicacion detalle :"+JSON.stringify( this.data.piso.ubicacion))
    //this.quitalosPorductosYaagregados();


  }

  dialigProducto(){
    this.dialog.open(ProductoComponent)
  }

  mustralosProdcutosdeDetalle(){

  }

/*
  addtoListapiso(codProdcuto:number){
   let numeroubicaccion= this.data.piso.ubicacion.length

    console.log("codigo deproducto a agregar es :"+JSON.stringify(codProdcuto))

    console.log("codigo ubicacion a actualizar  es :"+JSON.stringify(numeroubicaccion))
    //this.servideDetalleUbicacion.actualizaUbicaiondelDetalle(codProdcuto,)

  }*/

/*
  llenaSelectCategoria(){

    this.serviceCategoria.llenaSelect().subscribe(
      data=>{
        this.categorias=data

      }
    )


  }*/
/*
  //compara las los dos listas de las tablas y solo muestra en la lista productos los q no ha sido agregados
  quitalosPorductosYaagregados() {

      // Obtener todos los códigos de productos que ya están en ubicaciones
      const codigosProductosEnUbicaciones = this.data.piso.ubicacion.flatMap(
        ubicacion => ubicacion.detalleUbicacion.map(detalle => detalle.productos.codProducto)
      );

      // Filtrar productos para excluir aquellos que ya están en ubicaciones
      this.productos = this.productos.filter(producto =>
        !codigosProductosEnUbicaciones.includes(producto.codProducto)
      );

  }*/
/*
  listaPorCategoria(){
       this.serviceCategoria.listaPorCategoria(this.codCategoria).subscribe(
      data => {
        this.productos = data.productos
        //elimina de la lista los productos q ya estan en la lista
       this.quitalosPorductosYaagregados()



    });





  }*/

  }

