import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { NgFor, NgIf } from '@angular/common';
import { ClienteServiceService } from './service/cliente.service.service';
import { Cliente } from './models/cliente';
import { ClientePersona } from './models/clientePersona';

@Component({
  selector: 'app-clieentes',
  standalone: true,
  imports: [FormComponent,NgIf, NgFor],
  templateUrl: './clieentes.component.html',
  styleUrl: './clieentes.component.css'
})

export class ClieentesComponent {

  empresas: Cliente[]=[];


 empresaSelected: Cliente=new Cliente();
  
  tablaEmpresa: boolean=false;

  persona: ClientePersona[]=[];

  constructor(private service:ClienteServiceService, ){}

    ngOnInit(): void {
      //this.service.findallOf().subscribe(dataof =>this.empresas=dataof)
      this.service.findall().subscribe(data =>this.empresas=data)

      
    }

    onMostrarTabla(mostrar:boolean){
      this.tablaEmpresa=mostrar;
    }

    onUpdate(empresasrow:Cliente){
      this.empresaSelected={...empresasrow }

    }

    addClienteEmpresa(data: Cliente): void {

      if (data.codEmpresa > 0) {
    
        this.service.update(data).subscribe(empresaUpdate => {
    
          this.empresas = this.empresas.map(empr => {
            if (empr.codEmpresa == data.codEmpresa) {
              return { ...empresaUpdate };
            }
            return empr;
          });
    
        });
    
      } else {
        this.service.create(data).subscribe(() => {

          // Después de agregar un nuevo cliente, refrescamos la lista desde el backend
          this.service.findall().subscribe(data => {this.empresas = data});
    
        });
    
      }
      
      // Actualizar la vista después de agregar o actualizar un cliente
      this.empresaSelected = new Cliente();
    }

    onDelete(cod:number):void{
      this.service.deleted(cod).subscribe(()=>{
       //this.empresas=this.empresas.filter(data=>data.codEmpresa !=cod)//
       this.service.findall().subscribe(data => {this.empresas = data});
      })

    }





    




      




}
