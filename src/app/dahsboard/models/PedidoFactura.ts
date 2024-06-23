import { Estado } from "./Estado"
import { RowPedido } from "./RowPedido"
import { TipoEntrega } from "./TipoEntrega"
import { ClientePersona } from "./clientePersona"

export class PedidoFactura{
    codPedido!:number
    fecha!:string
    clientePersona!:ClientePersona
    rowPedidos: Array<RowPedido>=[]
    tipoEntrega!: TipoEntrega; 
    estado!:Estado;
}
