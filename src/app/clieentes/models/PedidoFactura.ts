import { RowPedido } from "./RowPedido"
import { ClientePersona } from "./clientePersona"

export class PedidoFactura{
    codPedido!:number
    fecha!:string
    clientePersona!:ClientePersona
    rowPedidos: Array<RowPedido>=[]


}
