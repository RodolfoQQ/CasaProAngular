import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PersonaYempresaServiceService } from '../../clieentes/service/persona-yempresa-service.service';
import { Cliente } from '../../clieentes/models/cliente';
import { ClientePersona } from '../../clieentes/models/clientePersona';
import { ClienteServiceService } from '../../clieentes/service/cliente.service.service';
import { PersonaServiceService } from '../../clieentes/service/persona-service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { flatMap, map, mergeMap, startWith, switchMap } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceProductoService } from '../../clieentes/service/service-producto.service';
import { Producto } from '../../clieentes/models/Productos';
import { RowPedido } from '../../clieentes/models/RowPedido';
import { PedidoFactura } from '../../clieentes/models/PedidoFactura';
import { ServicePedidoFacturaService } from '../../clieentes/service/service-pedido-factura.service';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [NgFor, NgIf, MatButtonModule, MatIconModule, MatDialogModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
    MatFormFieldModule
  ],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.css'
})
export class FormPedidoComponent {
  accion: string = "accciones";
  habilitarDireccion: boolean = true;
  detalleporMayor: boolean = true;

  //declaraciones para encontrar cliente de tipo persona o empresa
  rucODni!: string;
  clienteEmpresa: Cliente = new Cliente;
  clientePersona: ClientePersona = new ClientePersona;
  clienteCod: any;
  nombreCliente: string = "";

  //decalraciones para el autocomple
  autocompleteControl = new FormControl();
  // productos: string[] = ['One', 'Two', 'Three'];
  productosFiltrados!: Observable<Producto[]>;

  pedidoFactura: PedidoFactura = new PedidoFactura();


  constructor(private servicePersona: PersonaServiceService,
    public dialog: MatDialog,
    private serviceempresa: ClienteServiceService,
    private productoservice: ServiceProductoService,
    private servicePedidoFactura: ServicePedidoFacturaService

  ) {
    this.pedidoFactura.clientePersona = new ClientePersona();

  }




  //genere el autocomple

  ngOnInit() {
    this.productosFiltrados = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value == 'string' ? value : value.nombreProducto),
        switchMap(value => value ? this._filter(value) : [])



      );
  }




  public _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.productoservice.filtrarProductos(filterValue);
  }



  //comvierte el objeto de producto seleccionado  a string
  mostrarnombre(producto?: Producto): any | undefined {

    return producto ? producto.nombreProducto : undefined
  }


  selectedProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;

    let productoExistente = this.pedidoFactura.rowPedidos.find(data => data.producto.nombreProducto === producto.nombreProducto);

    if (productoExistente) {
      // Si el producto ya existe en la lista, aumenta su cantidad en 1
      productoExistente.cantidad++;

    } else {
      // Si el producto no existe en la lista, agrégalo con cantidad 1
      let nuevoRowdeProducto = new RowPedido();
      nuevoRowdeProducto.producto = producto;
      nuevoRowdeProducto.cantidad = 1; // Establece la cantidad inicial en 1
      

      this.pedidoFactura.rowPedidos.push(nuevoRowdeProducto);
    }

    // Luego de añadir el producto a la lista, cambia el valor que está en el input del autocompletado a vacío
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }


  findCliente() {
    //si tiene 8 digitos o menoos es dni por lo tanto limpia el input donde se muestra la empresa y prepara para mostrar el nombre de persona
    if (this.rucODni.length <= 8) {
      this.clienteEmpresa.nombre = "";
      this.clienteEmpresa.codEmpresa = 0
      this.servicePersona.findbyDni(this.rucODni).subscribe(
        data => {
          this.clientePersona = data;
          console.log(JSON.stringify(this.clientePersona.nombre) + "ingreso a persona")
          //al final limipa el parametro de entrada por el q se filtra 
          this.rucODni = "";

        }
      )
      //si no si  hace lo contrario
    } else if (this.rucODni.length >= 8) {
      this.clientePersona.nombre = "";
      this.clientePersona.codpersona = 0
      this.serviceempresa.findbyRuc(this.rucODni).subscribe(
        data => {
          this.clienteEmpresa = data
          console.log(JSON.stringify(this.clienteEmpresa) + "ingreso a empresa")
          this.rucODni = "";
        }
      )
    }
  }


  /*@Output() clienteOuputEmiter=new EventEmitter<any>();
  //metodo q encuentra un cliente de tipo persona o empresa y lo envia en un tipo any para usar solo un html
  findCliente(){
    if(this.rucODni.length>9){
      this.serviceempresa.findbyRuc(this.rucODni).subscribe(
      (data:Cliente)=>{
      this.clienteEmpresa=data
      this.clienteCod=this.clienteEmpresa.codEmpresa
      this.nombreCliente=this.clienteEmpresa.nombre
      this.clienteOuputEmiter.emit(this.clienteEmpresa)
       console.log(JSON.stringify(this.clienteEmpresa)+"ingreso a empresa")
      })
        }else if(this.rucODni.length <= 9){
            this.servicePersona.findbyDni(this.rucODni).subscribe(
              
              (data:ClientePersona)=>{
                this.clientePersona=data
                this.clienteCod=this.clientePersona.codpersona;
                this.nombreCliente=this.clientePersona.nombre
                this.clienteOuputEmiter.emit(this.clienteEmpresa)
                console.log(JSON.stringify(this.clientePersona)+ "ingreso a persona")
                
              }
            )
          }   
  }*/

  opendialogSendToAdrees() {
    // this.dialog.open()
  }

  guardarpedido() {
    this.pedidoFactura.clientePersona=this.clientePersona
    this.servicePedidoFactura.savePedido(this.pedidoFactura).subscribe(
      
    )

  }



  deletedRow(nombreProducto: string) {

    this.pedidoFactura.rowPedidos = this.pedidoFactura.rowPedidos.filter(data => data.producto.nombreProducto !== nombreProducto);

  }

}







