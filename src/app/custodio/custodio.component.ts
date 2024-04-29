import { Component } from '@angular/core';
import { FormCustodioComponent } from './form-custodio/form-custodio.component';

@Component({
  selector: 'app-custodio',
  standalone: true,
  imports: [FormCustodioComponent],
  templateUrl: './custodio.component.html',
  styleUrl: './custodio.component.css'
})
export class CustodioComponent {

}
