import { NgFor, NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../models/cliente';
import { ClientePersona } from '../models/clientePersona';
{}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf,NgFor,HttpClientModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {


    //public clientepersona: ClientePersona= new ClientePersona();

       @Input() personas:ClientePersona={
        codpersona:0,
        nombre:'',
        apellidos:'',
        dni:'',
        direccion:'',
      telefono:'',
      correo:''
      }



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


    @Output() personaNew=new EventEmitter();
    guardardPersona(){

      this.personaNew.emit(this.personas);
      console.log(this.personas)

    }






}
