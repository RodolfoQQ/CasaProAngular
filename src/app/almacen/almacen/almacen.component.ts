import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import Swal from 'sweetalert2';
import { Andamio } from '../../clieentes/models/Andamio';
import { Piso } from '../../clieentes/models/Piso';
import { Producto } from '../../clieentes/models/Productos';
import { Ubicacion } from '../../clieentes/models/Ubicacion';
import { DetalleUbicaion } from '../../clieentes/models/detalleUbicacion';
import { BehaivorSubjectService } from '../../clieentes/service/behaivor-subject-producto.service';
import { DetalleubicacionService } from '../../clieentes/service/detalleubicacion.service';
import { ServiceAlmacenService } from '../../clieentes/service/service-almacen.service';
import { UbicacionServiceService } from '../../clieentes/service/ubicacion-service.service';
import { DialogEditarcontenidoUbicacionComponent } from './dialog-editarcontenido-ubicacion/dialog-editarcontenido-ubicacion.component';
import { DialogProdcutosSinUbicacionComponent } from './dialog-prodcutos-sin-ubicacion/dialog-prodcutos-sin-ubicacion.component';
import { DialogagregarUbicacionComponent } from './dialogagregar-ubicacion/dialogagregar-ubicacion.component';


@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIcon,MatIconButton,FormsModule, NgClass],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})

export class AlmacenComponent {
  andamios!:Andamio[]


  prodcuto:Producto =new Producto();
  piso:Piso=new Piso();
  selectUbicacion:Ubicacion =new Ubicacion();
  detalleubicacion:DetalleUbicaion =new DetalleUbicaion()
 //detalleub:DetalleUbicaion[]=[]
  productodeDetalleubicacion:Producto[]=[]
  codUbicacionparaasignarDetalle: Ubicacion=new Ubicacion();


  constructor(private service:ServiceAlmacenService,
     public dialog :MatDialog,
     private serviceEliminarUbicacion:UbicacionServiceService,
     private serviceDetalle:DetalleubicacionService,
    private serviceBehaivo:BehaivorSubjectService
    ){


      }

      ngOnInit(): void {
        this.serviceBehaivo.andamioActualizado$.subscribe((data: Andamio[]) => {
          this.andamios = data;
         // Fuerza la detección de cambios
        });

        this.listarAndamio();

      }

  //abre el dialgog y envia la informacion al componente traido
  listarAndamio(){

    this.service.listarAndamio().subscribe(data=>{
      this.andamios=data
      this.serviceBehaivo.actualizaAndamio(data);


    })
  }

  determinaClasededetalleStock(stock:number){

      if(stock>80){
        return'bien'

      } else if (stock>=40 && stock<=80){
        return'aceptable'

      }else{
        return'peligro'
      }
  }


  editarCotenidoPiso(piso:Piso){
    this.piso={...piso}
    this.dialog.open(DialogagregarUbicacionComponent,{
      width:"800px",
      height:"800",

          data:{
              piso:this.piso
          }
    })
  }

  eliminarUbicacionconsuProducto(codUbicacion:number){

    this.serviceEliminarUbicacion.eliminarUbicacionConProducto(codUbicacion).subscribe(
      ()=>{
        Swal.fire({

          text: 'Esta seguro de eliminar la ubicacion',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, segurisimo'
        }).then((result) => {
          if (result.isConfirmed) {
           this.listarAndamio();
           //recibe el codigo del producto y el cuerpo


          }
        });
      }
    )
  }

  editarContenidoUbicacion(codubicacion:Ubicacion,piso:Piso,codUbitoAgregar:Ubicacion){
    this.selectUbicacion={...codubicacion}///envia datos deatlle
    this.piso={...piso}
    this.codUbicacionparaasignarDetalle={ ...codUbitoAgregar}

    this.dialog.open(DialogEditarcontenidoUbicacionComponent,{
      width:"300px",
      height:"400px",
      data: {
        dataDetalleDeubicacion:this.selectUbicacion,
          ubicacionesDePiso:this.piso,
          codubiToaddDet:this.codUbicacionparaasignarDetalle
      },

    })
   // console.log("codigo de ubicacion en alamacen"+JSON.stringify(codDetalle))

  }

  quistardetalleaubicacion(codDetalleub:number):void{
      this.service.actualizaDetallenVacio(codDetalleub).subscribe(
        ()=>{

          this.listarAndamio();
        }
      )
  }

  listaDetalledeUbicacion(){
    this.serviceDetalle.listardetalledeubicacion().subscribe(data=>{
   //   this.detalleub=data


    })
  }

  findDetalleubicacionByid(codubicacion:number){

    this.serviceDetalle.finddetalledeubicacion(codubicacion).subscribe(data=>{

      this.detalleubicacion=data
      console.log( "datos de detalle son :"+this.detalleubicacion)
    })


  }

  productosSinubicacion(){
      this.dialog.open(DialogProdcutosSinUbicacionComponent,{

      })
  }

  agregarAndamio(){

    this.service.agregarAndamio().subscribe(
      ()=>{
        alert("se agrego andamio")
          this.listarAndamio()
      }
    )

  }


  eliminarAndamio(codandamio:number){
    this.service.eliminarAndamioyRelaciones(codandamio).subscribe(
      ()=>{
        alert("se elimino andamio")
        this.listarAndamio();
      }
    )

  }
}
