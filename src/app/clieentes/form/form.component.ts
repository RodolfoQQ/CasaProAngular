import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ClieentesComponent } from '../clieentes.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [/*ClieentesComponent, */NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  habilitado:boolean=false;

  setHabiliar(): void{
    this.habilitado=this.habilitado? false: true;
  }
  

}
