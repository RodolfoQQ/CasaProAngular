import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
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

  usuario:string='admin'
  password:string='123456'

  iniciarsesion(usuario:HTMLInputElement,password:HTMLInputElement) {

    if(usuario.value==this.usuario && password.value==this.password){
      this.autservice.login(usuario.value,password.value)
      this.router.navigateByUrl("/dashboard");
    }else{
      Swal.fire("Error!", "Usuario o contraseña incorrectas!", "error");
    }

  }
}
