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

  constructor(private service:ClienteServiceService){}
    ngOnInit(): void {
      
      this.service.findall().subscribe(data=>this.empresas=data)

    }

    onMostrarTabla(mostrar:boolean){
      this.tablaEmpresa=mostrar;
    }

    onUpdate(empresasrow:Cliente){
      this.empresaSelected={...empresasrow }

    }


    addClienteEmpresa(data:Cliente):void{
      if(data.codEmpresa>0){
          this.empresas=this.empresas.map(empr=>{
            if(empr.codEmpresa==data.codEmpresa){
                return{... data}
            }
            return empr;
          })
      }else{

        this.empresas= [... this.empresas, {... data, codEmpresa:new Date().getTime()}];
      }
      this.empresaSelected= new Cliente();
      

    }
    onDelete(cod:number):void{
      this.empresas=this.empresas.filter(data=>data.codEmpresa !=cod)
    }

      




}
