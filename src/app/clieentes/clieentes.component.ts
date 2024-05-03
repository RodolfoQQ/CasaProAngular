import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { NgFor, NgIf } from '@angular/common';
import { ClienteServiceService } from './service/cliente.service.service';
import { Cliente } from './models/cliente';
import { ClientePersona } from './models/clientePersona';
import { PersonaServiceService } from './service/persona-service.service';

@Component({
  selector: 'app-clieentes',
  standalone: true,
  imports: [FormComponent,NgIf, NgFor],
  templateUrl: './clieentes.component.html',
  styleUrl: './clieentes.component.css'
})

export class ClieentesComponent {

  empresas: Cliente[]=[];

  personaSeled: ClientePersona=new ClientePersona();
  empresaSelected: Cliente=new Cliente();
  personanew:ClientePersona=new ClientePersona();
  tablaEmpresa: boolean=false;

  personas: ClientePersona[]=[];

  constructor(private service:ClienteServiceService, private servicePersona:PersonaServiceService){}

    ngOnInit(): void {
      //this.service.findallOf().subscribe(dataof =>this.empresas=dataof)
      this.service.findall().subscribe(data =>this.empresas=data)
      this.servicePersona.findallPersonas().subscribe(data=>this.personas=data)
      
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

//aqui empieza el consumo del servicio persona//////////////////////////////////////////////////////////////////////////////

    addpersontotabla(data:ClientePersona){

      if(data.codpersona>0){
        
        this.servicePersona.updatePersona(data).subscribe(persnew=>{
        
            this.personas=this.personas.map(pers=>{

                      if(pers.codpersona==data.codpersona){
                        return { ...persnew}
                      }
                      return pers
                    })

        })
        
       
      }
      else{
            this.servicePersona.guardarPersona(data).subscribe((()=>{

              this.servicePersona.findallPersonas().subscribe(data=>{this.personas=data})

            }))
    //  this.personas=[... this.personas,{ ... data, codpersona:new Date().getTime()}]
      }

      this.personaSeled = new ClientePersona();

    }
    onUpdateClientePersona(datarow:ClientePersona){
      //this.personaSeled=this.personaSeled=datarow

      this.personaSeled={...datarow}

    }

    onDeletedRow(codPersona:number){
      this.servicePersona.deletePersonabyId(codPersona).subscribe(()=>{
        this.servicePersona.findallPersonas().subscribe(data=>{this.personas=data})
      })
        
    }



    




    




      




}
