import { Component } from '@angular/core';
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

   public clienteempresa: Cliente= new Cliente();
   empresa: Cliente[]=[];
   persona: ClientePersona[]=[];
   

  habilitado:boolean=false;

  setHabiliar(): void{
    this.habilitado=this.habilitado? false: true;
  }
  constructor(private service: ClienteServiceService, private servicePer: PersonaServiceService,private router :Router ){}

  ngOnInit(): void {
    this.service.findall().subscribe(
      data => this.empresa = data
    )
   this.servicePer.findallPersonas().subscribe(
      data=> this.persona = data)
      console.log(this.empresa)
  }

  crear():void{
      this.service.createClienteEmpre(this.clienteempresa)
      console.log(this.clienteempresa)
   
  }




}
