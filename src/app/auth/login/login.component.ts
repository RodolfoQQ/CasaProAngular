import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AppComponent } from '../../AppComponent';
import { MaterialModule } from '../../material-module/material-module.module';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule,RouterOutlet,AppComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private router: Router, private autservice: ServiceService) {}

  iniciarsesion(usuario:HTMLInputElement,password:HTMLInputElement) {

    this.autservice.login(usuario.value,password.value)
    this.router.navigateByUrl("/dashboard");


  }
}
