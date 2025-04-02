import { Armazenador } from "./Armazenador.js";
import { TipoTransacao } from "./TipoTransacao.js";
export class Conta {
    constructor() {
    }
    compra(quantidade, valor) {
        let saldo = Armazenador.obter("saldo") || 0;
        let total = Armazenador.obter("total") || 0;
        const valorCompra = quantidade * valor;
        saldo -= valorCompra;
        total -= valorCompra;
        Armazenador.salvar("saldo", saldo);
        Armazenador.salvar("total", total);
    }
    venda(quantidade, valor) {
        let saldo = Armazenador.obter("saldo") || 0;
        let total = Armazenador.obter("total") || 0;
        const valorVenda = quantidade * valor;
        saldo += valorVenda;
        total += valorVenda;
        Armazenador.salvar("saldo", saldo);
        Armazenador.salvar("total", total);
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.COMPRA) {
            this.compra(novaTransacao.quantidade, novaTransacao.valor);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.VENDA) {
            this.venda(novaTransacao.quantidade, novaTransacao.valor);
        }
        else {
            throw new Error("Tipo de transação inválido.");
        }
        const transacoes = Armazenador.obter("transacoes") || [];
        transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", transacoes);
    }
}
export const conta = new Conta();
