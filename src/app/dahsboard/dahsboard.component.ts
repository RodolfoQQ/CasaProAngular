import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { ServiceService } from '../auth/service.service';
import { MaterialModule } from '../material-module/material-module.module';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [MaterialModule, RouterOutlet],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.css'
})
export class DahsboardComponent {

  constructor(private router:Router,
    private route:ActivatedRoute, private autservice:ServiceService
  ){}

  irAlmacen(){
    this.router.navigate(["almacen"],{relativeTo:this.route})
  }

  irCliente(){
    this.router.navigate(["clientes"],{relativeTo:this.route})
  }
  irPedido(){
    this.router.navigate(["pedido"],{relativeTo:this.route})
  }
  irListado(){
    this.router.navigate(["listaPedidos"],{relativeTo:this.route})
  }

  irProductos(){
    this.router.navigate(["producto"],{relativeTo:this.route})
  }

  salir(){
    this.autservice.logOut()
    this.router.navigateByUrl("/login")
  }
}
