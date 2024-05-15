import { Routes } from '@angular/router';
import { ClieentesComponent } from './clieentes/clieentes.component';
import { ProvedoresComponent } from './provedores/provedores.component';
import { FormComponent } from './clieentes/form/form.component';
import { ProductoComponent } from './producto/producto.component';
import { CustodioComponent } from './custodio/custodio.component';
import { PedidoComponent } from './pedido/pedido.component';
import { FormPedidoComponent } from './pedido/form-pedido/form-pedido.component';

export const routes: Routes = [
    {path:'clientes',component: ClieentesComponent},
    {path:'provedores',component: ProvedoresComponent},
    {path:'producto', component: ProductoComponent},
    {path:'custodio', component: CustodioComponent},
    {path:'pedido', component:FormPedidoComponent}
    
    
];
