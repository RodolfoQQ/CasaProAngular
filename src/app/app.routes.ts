import { Routes } from '@angular/router';

import { authGuard } from './auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { CustodioComponent } from './custodio/custodio.component';
import { AlmacenComponent } from './dahsboard/almacen/almacen.component';
import { ClieentesComponent } from './dahsboard/clieentes/clieentes.component';
import { DahsboardComponent } from './dahsboard/dahsboard.component';
import { EntregapedidoComponent } from './dahsboard/entregapedido/entregapedido.component';
import { FormPedidoComponent } from './dahsboard/form-pedido/form-pedido.component';
import { ProductoComponent } from './dahsboard/producto/producto.component';
import { PagenotfoudComponent } from './pagenotfoud/pagenotfoud.component';
import { ProvedoresComponent } from './provedores/provedores.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DahsboardComponent,
    canActivate:[authGuard],
    children: [
      { path: 'clientes', component: ClieentesComponent },
      { path: 'provedores', component: ProvedoresComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'custodio', component: CustodioComponent },
      { path: 'pedido', component: FormPedidoComponent },
      { path: 'listaPedidos', component: EntregapedidoComponent },
      { path: 'almacen', component: AlmacenComponent },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: PagenotfoudComponent }
];
