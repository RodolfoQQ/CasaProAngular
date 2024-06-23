import { Component } from '@angular/core';
import { MaterialModule } from '../../material-module/material-module.module';
import { ServiceAlmacenService } from '../../service/service-almacen.service';
import { DTODetallessinubicacion } from '../models/DTODetallessinubicacion';

@Component({
  selector: 'app-dialog-prodcutos-sin-ubicacion',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog-prodcutos-sin-ubicacion.component.html',
  styleUrl: './dialog-prodcutos-sin-ubicacion.component.css'
})
export class DialogProdcutosSinUbicacionComponent {

  listadetallessinubicacion:DTODetallessinubicacion[]=[]

constructor(private serviceAlmacen:ServiceAlmacenService){
}

ngOnInit(): void {
  this.listaDEtallesSinubicacion();

}

listaDEtallesSinubicacion(){
  this.serviceAlmacen.listaDEtallesSinubicacion().subscribe(dataSinub=>{
      this.listadetallessinubicacion=dataSinub
  })
}

}
