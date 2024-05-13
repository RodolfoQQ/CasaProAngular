import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ClieentesComponent } from './clieentes/clieentes.component';
import { FormComponent } from './clieentes/form/form.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-rootClientes',
  standalone: true,
  imports: [NgIf, RouterOutlet, RouterLink, ClieentesComponent, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
}
