import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../material-module/material-module.module';
import { ClienteServiceService } from '../../service/cliente.service.service';
import { PersonaServiceService } from '../../service/persona-service.service';
import { FormComponent } from '../formPersona/form.component';
import { ClientePersona } from '../models/clientePersona';
@Component({
  selector: 'app-clieentes',
  standalone: true,
  imports: [FormComponent,NgIf, NgFor,FormsModule, MaterialModule],
  templateUrl: './clieentes.component.html',
  styleUrl: './clieentes.component.css'
})

export class ClieentesComponent {

 // empresas: Cliente[]=[];

  personaSeled: ClientePersona=new ClientePersona();
  //empresaSelected: Cliente=new Cliente();
  personanew:ClientePersona=new ClientePersona();
  //tablaEmpresa: boolean=false;
  personas:ClientePersona=new ClientePersona();
  personaslist: ClientePersona[]=[];

  error: any = {};

  constructor(private service:ClienteServiceService, private servicePersona:PersonaServiceService){}

    ngOnInit(): void {
      //this.service.findallOf().subscribe(dataof =>this.empresas=dataof)

      this.listatodasPersonas();

    }

    listatodasPersonas(){
      this.servicePersona.findallPersonas().subscribe(data=>this.personaslist=data)

    }

    guardardPersona(){
      if(this.personas.codpersona>0){
        this.servicePersona.updatePersona(this.personas).subscribe({next:()=>{this.listatodasPersonas(),this.personas=new ClientePersona()}
        ,error:(err)=>{
          this.error = err.error;
          console.log(err.error)}}

        )
      }else{
        this.servicePersona.findbyDni(this.personas.dni).subscribe(datadni=>{
         const dniexiste:any=datadni
         if(dniexiste!==null){
          Swal.fire("El Cliente ya se encuentra registrado")
         }else{
          this.servicePersona.guardarPersona(this.personas).subscribe({next:()=>{this.listatodasPersonas(),this.personas=new ClientePersona();}
          ,error:(err)=>{
                  this.error = err.error;

              }
            }
          )
         }
        }
        )

      }

    }

    onUpdateClientePersona(datarow:ClientePersona){
      //this.personaSeled=this.personaSeled=datarow

      this.personaSeled={...datarow}
      this.personas.codpersona=this.personaSeled.codpersona;
      this.personas.nombre=this.personaSeled.nombre;
      this.personas.apellidos=this.personaSeled.apellidos;
      this.personas.dni=this.personaSeled.dni;
      this.personas.correo=this.personaSeled.correo;
      this.personas.direccion=this.personaSeled.direccion;
      this.personas.telefono=this.personaSeled.telefono;


    }

    onDeletedRow(codPersona:number){
      this.servicePersona.deletePersonabyId(codPersona).subscribe(()=>{
        this.servicePersona.findallPersonas().subscribe(data=>{this.personaslist=data})
      })

    }


















}
