import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Cliente } from '../models/cliente';
import { ClienteServiceService } from '../service/cliente.service.service';
import { HttpClientModule } from '@angular/common/http';
import { PersonaServiceService } from '../service/persona-service.service';
import { ClientePersona } from '../models/clientePersona';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
{}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf,NgFor,HttpClientModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  //  public clienteempresa: Cliente= new Cliente();
    public clientepersona: ClientePersona= new ClientePersona();
     @Input() clienteempresa:Cliente={
      codEmpresa:0,
      nombre:'',
      ruc:'',
      direccion:'',
      telefono:'',
      correo:''
    }

    habilitado:boolean=false;

    habilitartabla:boolean=false;
    @Output() cambiohabilitartabla= new EventEmitter<boolean>();

  setHabiliar(): void{
    //cambia de formulario de cliente
    this.habilitado=this.habilitado? false: true;
    
    //cambiade tabla de cliente
    
    //esta es otra opcion al operador ternario
   // this.habilitartabla =! this.habilitartabla
   
    this.habilitartabla = this.habilitartabla ? false : true;
    this.cambiohabilitartabla.emit(this.habilitartabla);

  }

  @Output() nuevoClienteEmpresa =new EventEmitter();


  crearCliempresa():void{
        this.nuevoClienteEmpresa.emit(this.clienteempresa)
        console.log( this.clienteempresa)

        
    }

  




}
