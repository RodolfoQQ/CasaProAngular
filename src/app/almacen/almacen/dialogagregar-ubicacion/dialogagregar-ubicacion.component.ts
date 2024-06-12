import { DialogRef } from '@angular/cdk/dialog';
import { NgFor } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Categoria } from '../../../clieentes/models/Categoria';
import { Piso } from '../../../clieentes/models/Piso';
import { Producto } from '../../../clieentes/models/Productos';
import { Ubicacion } from '../../../clieentes/models/Ubicacion';
import { DetalleubicacionService } from '../../../clieentes/service/detalleubicacion.service';
import { ServiceCategoriaService } from '../../../clieentes/service/service-categoria.service';
import { ServicePisoService } from '../../../clieentes/service/service-piso.service';
import { ServiceProductoService } from '../../../clieentes/service/service-producto.service';
import { ProductoComponent } from '../../../producto/producto.component';





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
   this.llenaSelectCategoria();

   console.log("datos de ubicacion detalle :"+JSON.stringify( this.data.piso.ubicacion))
    //this.quitalosPorductosYaagregados();


  }

  dialigProducto(){
    this.dialog.open(ProductoComponent)
  }

  mustralosProdcutosdeDetalle(){

  }


  addtoListapiso(codProdcuto:number){
   let numeroubicaccion= this.data.piso.ubicacion.length

    console.log("codigo deproducto a agregar es :"+JSON.stringify(codProdcuto))

    console.log("codigo ubicacion a actualizar  es :"+JSON.stringify(numeroubicaccion))
    //this.servideDetalleUbicacion.actualizaUbicaiondelDetalle(codProdcuto,)

  }


  llenaSelectCategoria(){

    this.serviceCategoria.llenaSelect().subscribe(
      data=>{
        this.categorias=data

      }
    )


  }

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

  }

  listaPorCategoria(){
       this.serviceCategoria.listaPorCategoria(this.codCategoria).subscribe(
      data => {
        this.productos = data.productos
        //elimina de la lista los productos q ya estan en la lista
       this.quitalosPorductosYaagregados()



    });





  }
/*
  quitarProdcuto(producto:Producto){
    console.log(producto.codProducto)
    let productoYaexiste =this.data.piso.ubicacion.find(p=>p.productos.codProducto===producto.codProducto)
    if(productoYaexiste){
      console.log("existe el produto")
      this.data.piso.ubicacion=this.data.piso.ubicacion.filter(
        p=>p.productos.codProducto!==producto.codProducto

      )

      this.productos.push(producto)

    }*/
  }


/*
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
/*
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
  }*/




