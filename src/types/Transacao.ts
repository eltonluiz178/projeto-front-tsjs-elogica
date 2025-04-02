import { TipoTransacao } from "./TipoTransacao.js";

export class Transacao {
    tipoTransacao: TipoTransacao;
    mercadoria: string;
    quantidade: number;
    valor: number;
    idTransacao: string;

    constructor(
        tipoTransacao: TipoTransacao,
        mercadoria : string,
        quantidade : number,
        valor: number
     ) {
         this.tipoTransacao = tipoTransacao;
         this.mercadoria = mercadoria;
         this.quantidade = quantidade;
         this.valor = valor;
         this.idTransacao = `${Date.now()}-${Math.random().toString(36).substr(2,9)}`;
    }
}