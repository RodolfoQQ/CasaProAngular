import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Categoria } from '../../../clieentes/models/Categoria';
import { Piso } from '../../../clieentes/models/Piso';
import { Producto } from '../../../clieentes/models/Productos';
import { Ubicacion } from '../../../clieentes/models/Ubicacion';
import { BehaivorSubjectService } from '../../../clieentes/service/behaivor-subject-producto.service';
import { DetalleubicacionService } from '../../../clieentes/service/detalleubicacion.service';
import { ServiceAlmacenService } from '../../../clieentes/service/service-almacen.service';
import { ServiceCategoriaService } from '../../../clieentes/service/service-categoria.service';

@Component({
  selector: 'app-dialog-editarcontenido-ubicacion',
  standalone: true,
  imports: [NgIf, MatIcon,FormsModule],
  templateUrl: './dialog-editarcontenido-ubicacion.component.html',
  styleUrl: './dialog-editarcontenido-ubicacion.component.css'
})
export class DialogEditarcontenidoUbicacionComponent {

  ubicacion:Ubicacion =new Ubicacion();
  nombreCategoria:string[]=[]
  codcategoria!:number
  //productosDeLasUbicaciones:Ubicacion[]=[]
  //productosDePiso:Producto[]=[]
  //piso:Piso=new Piso();
  categoria:Categoria[]=[];
  //productosporCategoriaDisponibles:Producto[]=[]
  ///////////////////////////
  //productosDisponibles:any[]=[]
  productoPorCategoria:Producto[]=[]
  produtosFiltrados:Producto[]=[]
  //codCategoriaDeProducto!:number;
  //codDetalle!:number;

  ///
 prodcutosdeDetalles:Producto[]=[]
  estadoCategoria:boolean=false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:{dataDetalleDeubicacion: Ubicacion,
    ubicacionesDePiso:Piso,
    },
    private servicioCategoria:ServiceCategoriaService,
    private serviceDetalle:DetalleubicacionService,
    private servicioAndamio:ServiceAlmacenService,
    private serviceBehaivor:BehaivorSubjectService,
    private serviceCategoria:ServiceCategoriaService,
    private dialofRef:DialogRef<DialogEditarcontenidoUbicacionComponent>
  ) {

  }


  ngOnInit(): void {
    this.obtenernombrecategoria()
    this.listaPorCategoria()

    }

  obtenernombrecategoria(){
    this.nombreCategoria=this.data.dataDetalleDeubicacion.detalleUbicacion.
    map(detalle=> detalle.productos.categoria.nombrCategoria);

  }




  listacategoria(){
    this.serviceCategoria.llenaSelect().subscribe(datacategorias=>{
      this.categoria=datacategorias

    })

}



  listaPorCategoria(){

    const cod: number = Number(this.data.dataDetalleDeubicacion.detalleUbicacion.find(det => det.productos.categoria.codCategoria)?.productos.categoria.codCategoria);
  ///evalua si en detalle de la ubicacion hay detalledeubicaion, si no lo hay muestra un select
    if(isNaN(cod)){
        this.estadoCategoria=true;
        this.listacategoria();

       // this.quitalosPorductosYaagregados();

    }else{
      this.servicioCategoria.listaPorCategoria(cod).subscribe(
        resul => {
          this.productoPorCategoria = resul.productos

         this.quitalosPorductosYaagregados()
       });

    }


        /*this.serviceCategoria.llenaSelect().subscribe(datacategorias=>{
          this.categoria=datacategorias

        })
*/




}
//compara la lista de losproductos en el piso y productos por catgpria y obtiene los q no se agregaron
quitalosPorductosYaagregados(){
  const codigosProductosEnUbicaciones = this.data.ubicacionesDePiso.ubicacion.flatMap(
    ubicacion => ubicacion.detalleUbicacion.map(detalle => detalle.productos.codProducto))

  this.productoPorCategoria=this.productoPorCategoria.filter
  (prod=>!codigosProductosEnUbicaciones.includes(prod.codProducto))

}


remplazarProducto(coddetalle:number,codProdcuto:number){
// aquien en este metodo despues de guardar debe actualizar los andamios
console.log("cod ubicacion : "+coddetalle+" cod producto "+codProdcuto)

  this.serviceDetalle.actualizaUbicaiondelDetalle(coddetalle,codProdcuto).subscribe(()=>{
    alert("se actualizo producto")

    this.actulaizarAndamios();
  } )

}
  private actulaizarAndamios(){
    this.servicioAndamio.listarAndamio().subscribe(dataandamios=>{
      this.serviceBehaivor.actualizaAndamio(dataandamios);
      console.log("datos de Andamio "+ dataandamios)

    })

  }



prodcutosPorcategoria(codcategoria:number){
  this.serviceCategoria.listaPorCategoria(codcategoria).subscribe(dataProd=>{
   this.productoPorCategoria=dataProd.productos

   const prodcutosdeDetalles:number[]=this.data.ubicacionesDePiso.ubicacion
   .flatMap(datamap=>datamap.detalleUbicacion.map(dataProd=>dataProd.productos.codProducto))

    this.productoPorCategoria=this.productoPorCategoria.filter(prodCate=>!
      prodcutosdeDetalles.includes(prodCate.codProducto))

    console.log("producto por categoria ---> "+ JSON.stringify(this.productoPorCategoria)+this.productoPorCategoria.length)


      console.log("productos de los pisos:" +JSON.stringify(this.prodcutosdeDetalles)+"cantidad-->"+this.prodcutosdeDetalles.length)


  })


}
}


