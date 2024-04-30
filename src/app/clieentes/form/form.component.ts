import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Cliente } from '../models/cliente';
import { ClienteServiceService } from '../service/cliente.service.service';
import { HttpClientModule } from '@angular/common/http';
{}
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgIf,NgFor,HttpClientModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

   empresa: Cliente[]=[];

  habilitado:boolean=false;

  setHabiliar(): void{
    this.habilitado=this.habilitado? false: true;
  }
  constructor(private service: ClienteServiceService ){}

  ngOnInit(): void {
    this.service.findall().subscribe(
      data => this.empresa = data
    )

  }

}
