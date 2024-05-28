import { Component, NgModule } from '@angular/core';
import { Andamio } from '../../clieentes/models/Andamio';
import { ServiceAlmacenService } from '../../clieentes/service/service-almacen.service';
import { NgFor, NgIf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Producto } from '../../clieentes/models/Productos';
import { Piso } from '../../clieentes/models/Piso';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogagregarUbicacionComponent } from './dialogagregar-ubicacion/dialogagregar-ubicacion.component';
/*export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}*/

@Component({
  selector: 'app-almacen',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule],
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.css'
})

export class AlmacenComponent {
  andamios!:Andamio[] 
  prodcuto:Producto =new Producto();
  piso:Piso=new Piso();
    
  constructor(private service:ServiceAlmacenService, public dialog :MatDialog){
    
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
}
