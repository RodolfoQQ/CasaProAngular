import { DialogRef } from '@angular/cdk/dialog';
import { NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { BehaivorSubjectService } from '../../service/behaivor-subject-producto.service';
import { DetalleubicacionService } from '../../service/detalleubicacion.service';
import { ServiceAlmacenService } from '../../service/service-almacen.service';
import { ServiceCategoriaService } from '../../service/service-categoria.service';
import { Categoria } from '../models/Categoria';
import { DtoAddDetalleubicacion } from '../models/DtoAddDetalleubicacion';
import { Piso } from '../models/Piso';
import { Producto } from '../models/Productos';
import { Ubicacion } from '../models/Ubicacion';
import { DetalleUbicaion } from '../models/detalleUbicacion';

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
  categoria:Categoria[]=[];
  productoPorCategoria:Producto[]=[]
  produtosFiltrados:Producto[]=[]
      codDetalleubicacion:number[]=[]
      listProdDispDTO:DtoAddDetalleubicacion[]=[]
      estadoCategoria:boolean=false
      mensaje:boolean=false;

 codUbicacion!:number;

  constructor(@Inject(MAT_DIALOG_DATA) public data:{
    dataDetalleDeubicacion: Ubicacion,
    ubicacionesDePiso:Piso,
    codDetalle:DetalleUbicaion,
    codubiToaddDet:Ubicacion
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
    console.log("codgio del detalle ubicacion ---->>")

    }

    obtenerCodDetalleUbicacion(){
     this.codDetalleubicacion= (this.data.dataDetalleDeubicacion.detalleUbicacion.flatMap(ubc=>ubc.codDetalleub))
         const posison= this.data.dataDetalleDeubicacion.detalleUbicacion


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

agregarDeatlleEnubicacion(codubicacion:number, coddetalleub:number){

  this.serviceDetalle.agregarDetalleaubicacionvacia(codubicacion,coddetalleub).subscribe(
    ()=>{
      this.actulaizarAndamios();
      this.productosDisponibles(this.codcategoria);
      this.dialofRef.close()

    }
  )



}

  listaPorCategoria(){

    const cod: number = Number(this.data.dataDetalleDeubicacion.detalleUbicacion.find(det => det.productos.categoria.codCategoria)?.productos.categoria.codCategoria);
  ///evalua si en detalle de la ubicacion hay detalledeubicaion, si no lo hay muestra un select
    if(isNaN(cod)){
      this.estadoCategoria=true;
        this.listacategoria();


    }else{
      this.servicioCategoria.listaPorCategoria(cod).subscribe(
        resul => {
          this.productoPorCategoria = resul.productos
        // el metodo quitar prodcuto esta para evaluar si se quita ya que se implemteno desde  la
        //base de datos una cosulta q lista los qe
          this.quitalosPorductosYaagregados()
       });

    }


}
//compara la lista de losproductos en el piso y productos por catgpria y obtiene los q no se agregaron
quitalosPorductosYaagregados(){
  const codigosProductosEnUbicaciones = this.data.ubicacionesDePiso.ubicacion.flatMap(
    ubicacion => ubicacion.detalleUbicacion.map(detalle => detalle.productos.codProducto))

  this.productoPorCategoria=this.productoPorCategoria
  .filter(prod=>!codigosProductosEnUbicaciones.includes(prod.codProducto))

}


remplazarProducto(coddetalle:number,codProdcuto:number){
// aquien en este metodo despues de guardar debe actualizar los andamios
console.log("cod ubicacion : "+coddetalle+" cod producto "+codProdcuto)

  this.serviceDetalle.remplazarProducto(coddetalle,codProdcuto).subscribe(()=>{
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
   console.log( "datos de categoria><<" +JSON.stringify(this.productoPorCategoria))
   const prodcutosdeDetalles:number[]=this.data.ubicacionesDePiso.ubicacion
   .flatMap(datamap=>datamap.detalleUbicacion.map(dataProd=>dataProd.productos.codProducto))
    this.productoPorCategoria=this.productoPorCategoria.filter(prodCate=>!
      prodcutosdeDetalles.includes(prodCate.codProducto))
      console.log("codigo de categoria es :"+JSON.stringify(codcategoria))


  })
  this.productosDisponibles(codcategoria);
}
 productosDisponibles(codcategoria:number){

  this.serviceDetalle.getdDTOetalleDisponibles(codcategoria).subscribe(dataprod=>{
    this.listProdDispDTO=dataprod
    if (this.listProdDispDTO.length>0){
      this.mensaje=true

    }else{
      this.mensaje=false
    }
  })
 }

}


