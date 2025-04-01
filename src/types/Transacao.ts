import { TipoTransacao } from "./TipoTransacao.js";

export type Transacao = {
    tipoTransacao: TipoTransacao;
    mercadoria: string;
    quantidade: number;
    valor: number;
}