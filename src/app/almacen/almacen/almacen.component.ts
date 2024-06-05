import { Component, NgModule } from '@angular/core';
import { Andamio } from '../../clieentes/models/Andamio';
import { ServiceAlmacenService } from '../../clieentes/service/service-almacen.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Producto } from '../../clieentes/models/Productos';
import { Piso } from '../../clieentes/models/Piso';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import { DialogagregarUbicacionComponent } from './dialogagregar-ubicacion/dialogagregar-ubicacion.component';
import { MatIcon } from '@angular/material/icon';
import { UbicacionServiceService } from '../../clieentes/service/ubicacion-service.service';
import { Ubicacion } from '../../clieentes/models/Ubicacion';
import Swal from 'sweetalert2';
import { DialogEditarcontenidoUbicacionComponent } from './dialog-editarcontenido-ubicacion/dialog-editarcontenido-ubicacion.component';
/*export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}*/

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIcon,MatIconButton,FormsModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})

export class AlmacenComponent {
  andamios!:Andamio[] 
  prodcuto:Producto =new Producto();
  piso:Piso=new Piso();
  selectUbicacion:Ubicacion =new Ubicacion();
  
    
  constructor(private service:ServiceAlmacenService,
     public dialog :MatDialog,
    public serviceEliminarUbicacion:UbicacionServiceService
    ){
      this.selectUbicacion.productos= new Producto();
       }

  ngOnInit(): void {
    this.listarAndamio();
    
 

  }

  //abre el dialgog y envia la informacion al componente traido
  listarAndamio(){
   
    
    this.service.listarAndamio().subscribe(data=>{
      this.andamios=data

      })
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

  editaelcontenidodeUbicacion(codubicacion:Ubicacion, pisodata:Piso){
    this.selectUbicacion={...codubicacion}
    this.piso={...pisodata}
    
   console.log("datos de ub almacen "+JSON.stringify( this.selectUbicacion))
    this.dialog.open(DialogEditarcontenidoUbicacionComponent,{
      width:"300px",
      height:"400px",
      data: {
        dataUbicacionAlmacen:this.selectUbicacion,
        dataPiso:this.piso
      },
     
    })
  }
}
