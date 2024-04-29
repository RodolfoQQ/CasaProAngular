import { Component } from '@angular/core';
import { FomrprovedoresComponent } from './fomrprovedores/fomrprovedores.component';

@Component({
  selector: 'app-provedores',
  standalone: true,
  imports: [FomrprovedoresComponent],
  templateUrl: './provedores.component.html',
  styleUrl: './provedores.component.css'
})
export class ProvedoresComponent {

}
