import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../material-module/material-module.module';
import { ClienteServiceService } from '../../service/cliente.service.service';
import { PersonaServiceService } from '../../service/persona-service.service';
import { ServicePedidoFacturaService } from '../../service/service-pedido-factura.service';
import { ServiceProductoService } from '../../service/service-producto.service';
import { PedidoFactura } from '../models/PedidoFactura';
import { Producto } from '../models/Productos';
import { RowPedido } from '../models/RowPedido';
import { TipoEntrega } from '../models/TipoEntrega';
import { Cliente } from '../models/cliente';
import { ClientePersona } from '../models/clientePersona';
import { FrmEntregaDireccionComponent } from './frm-entrega-direccion.component';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [ NgFor, NgIf,  MaterialModule, MatIconModule, MatDialogModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe,
    MatFormFieldModule, FrmEntregaDireccionComponent,
  ],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.css'
})
export class FormPedidoComponent {
  accion: string = "accciones";

  rucODni!: string;
  clienteEmpresa: Cliente = new Cliente;
  clientePersona: ClientePersona = new ClientePersona;
  clienteCod: any;
  nombreCliente: string = "";

  showTable: boolean = false
  showCliente: boolean = false;


  autocompleteControl = new FormControl();

  productosFiltrados!: Observable<Producto[]>;

  pedidoFactura: PedidoFactura = new PedidoFactura();

  constructor(private servicePersona: PersonaServiceService,
    public dialog: MatDialog,
    private serviceempresa: ClienteServiceService,
    private productoservice: ServiceProductoService,
    private servicePedidoFactura: ServicePedidoFacturaService,
    private router:Router,
    private route:ActivatedRoute

  ) {
    this.pedidoFactura.tipoEntrega = new TipoEntrega();
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
    this.showTable = true;


    if (this.findProdInListPedido(producto.nombreProducto)) {
      console.log(producto.nombreProducto)

      Swal.fire({
        title: 'El producto ya se encuentra agregado en tu lista, Aumente la cantidad',
        timer: 3000
      })
    } else {
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


  //mediante un parametro numerico consulta si ya se encuentra en la lista si existe devuelve true
  findProdInListPedido(nombre: string): boolean {
    let existe: boolean = false;
    this.pedidoFactura.rowPedidos.forEach((row: RowPedido) => {
      if (nombre === row.producto.nombreProducto) {
        console.log("el producto ya existe en la lista")
        existe = true;
      }
    })
    return existe;
  }



  findCliente() {
    this.showCliente = true;

      this.servicePersona.findbyDni(this.rucODni).subscribe({
        next: (data: ClientePersona) => {

          this.clientePersona = data;
          if(this.clientePersona!=null){
            this.clientePersona = data;
              this.rucODni = "";
          }else{
            swal({
              title:"Cliente no Resgistrado",
              text:"desa ir a menu cliente para registrar un nuevo cliente?",
              icon:"error",

            }
            ).then((value) => {
              if (value) {
                this.irCliente();
              }
            });;
          }

        },

      });
      //si no si  hace lo contrario

    }


  irCliente(){
    this.router.navigate(["dashboard/clientes"])
  }

  //abre el dialog direcion y envia la variable pedidofactura
  //para poder obtener los bingids
  openDireccion(dataTosendDialog: PedidoFactura) {
    this.pedidoFactura = dataTosendDialog
    const dialog = this.dialog.open(FrmEntregaDireccionComponent, {
      width: "500px",
      height: "500px",
      data: { dataBinding: this.pedidoFactura }
    })

  }

  guardarpedido() {
    this.pedidoFactura.clientePersona = this.clientePersona
    if (this.showCliente == false) {
      Swal.fire({
        title: "Error!",
        text: "Seleccione un cliente",
        icon: "error",
      })
    } else {



      this.servicePedidoFactura.savePedido(this.pedidoFactura).subscribe(() => {

        //limpia los datos de entarda
          this.pedidoFactura = new PedidoFactura()
          this.pedidoFactura.tipoEntrega = new TipoEntrega();
          this.pedidoFactura.clientePersona = new ClientePersona();
        //oculta los elementos
            this.showTable = false
            this.showCliente = false
        Swal.fire({
          title: "Casa pro",
          text: "Operacion exitosa",
          icon: "success",
        })
      })
    }


  }



  deletedRow(nombreProducto: string) {

    this.pedidoFactura.rowPedidos = this.pedidoFactura.rowPedidos.filter(data => data.producto.nombreProducto !== nombreProducto);

  }

}







