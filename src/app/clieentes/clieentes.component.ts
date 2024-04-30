import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { NgIf } from '@angular/common';
import { ClienteServiceService } from './service/cliente.service.service';

@Component({
  selector: 'app-clieentes',
  standalone: true,
  imports: [FormComponent,NgIf],
  templateUrl: './clieentes.component.html',
  styleUrl: './clieentes.component.css'
})
export class ClieentesComponent {

  //constructor(private clienteEmpresaService:ClienteServiceService){}

/*
  ngOnInit(): void {
//    this.clienteEmpresaService.findall();

  }*/
}
