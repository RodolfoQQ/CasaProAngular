import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, ViewChild, model } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule}  from '@angular/material/icon';
import { MatDialogModule} from '@angular/material/dialog';  
import {MatDialog} from '@angular/material/dialog'; 

import { PersonaYempresaServiceService } from '../../clieentes/service/persona-yempresa-service.service';
import { Observable } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { Cliente } from '../../clieentes/models/cliente';
import { ClientePersona } from '../../clieentes/models/clientePersona';
import { ClienteServiceService } from '../../clieentes/service/cliente.service.service';
import { PersonaServiceService } from '../../clieentes/service/persona-service.service';

@Component({
  selector: 'app-form-pedido',
  standalone: true,
  imports: [NgFor,NgIf,MatButtonModule, MatIconModule, MatDialogModule,FormsModule ],
  templateUrl: './form-pedido.component.html',
  styleUrl: './form-pedido.component.css'
})
export class FormPedidoComponent {
  accion:string="accciones";
    habilitarDireccion:boolean=true;
  
    rucODni!:string;

    //cliente:any;
    //clientPersona:ClientePersona[]=[]
    //clienteEmpresa:Cliente[]=[]
    clienteEmpresa:Cliente= new Cliente;

    clientePersona:ClientePersona= new ClientePersona;
    clienteCod:any;
    nombreCliente:string="";
   

  constructor(private servicePersona:PersonaServiceService,
    public dialog:MatDialog,
     private service:PersonaYempresaServiceService,
     private serviceempresa:ClienteServiceService,
      
    ){

  }
 
  



  openVerlistadoProductos(){
    
  }


    
  @Output() clienteOuputEmiter=new EventEmitter<any>();
    findCliente(){

      if(this.rucODni.length>9){
        this.serviceempresa.findbyRuc(this.rucODni).subscribe(
   
          (data:Cliente)=>{
           this.clienteEmpresa=data
           this.clienteCod=this.clienteEmpresa.codEmpresa
           this.nombreCliente=this.clienteEmpresa.nombre
            this.clienteOuputEmiter.emit(this.clienteEmpresa)
           console.log(this.clienteEmpresa+"ingreso a empresa")
          }
         
        )
      }else if(this.rucODni.length <= 9){
          this.servicePersona.findbyDni(this.rucODni).subscribe(
            
            (data:ClientePersona)=>{
              this.clientePersona=data
              this.clienteCod=this.clientePersona.codpersona;
              this.nombreCliente=this.clientePersona.nombre
              
              
              this.clienteOuputEmiter.emit(this.clienteEmpresa)
              console.log(this.clientePersona+"ingreso a persona")
              
            }
          )
        }   

     
      
      
    }

    //@Output() eveneEmiterCli= new EventEmitter<any>();
   /* findcliente(): void {
    
      if(this.rucODni.length<9){
        
        this.service.findByDniorRuc(this.rucODni).subscribe(
          data=>{
  /*
            this.cliente=data as ClientePersona
            this.clientPersona=this.cliente
            console.log(this.clientPersona)
            this.clienteFined=this.clienteFined=data;
            this.eveneEmiterCli.emit(this.clientPersona)
            console.log(this.clienteFined+" clinete tipo persona");
            */
           /*
              this.clienteFined=data
              console.log(JSON.stringify(this.clienteFined)+" clinete tipo persona");

            }

        )

        
      }else {
        this.service.findByDniorRuc(this.rucODni).subscribe(
          data=>{
  
            this.cliente=data as Cliente
            this.clienteEmpresa=[this.cliente]
            console.log(this.clienteEmpresa)
            
            this.eveneEmiterCli.emit(this.clienteEmpresa)
            console.log(this.clienteEmpresa+" clinete tipo empresa");
          }
        )

        
      }
        
  }*/

      
    

  }

 



  

