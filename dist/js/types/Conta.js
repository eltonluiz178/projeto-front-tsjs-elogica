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
        this.salvarMudancas(saldo, total);
    }
    venda(quantidade, valor) {
        let saldo = Armazenador.obter("saldo") || 0;
        let total = Armazenador.obter("total") || 0;
        const valorVenda = quantidade * valor;
        saldo += valorVenda;
        total += valorVenda;
        this.salvarMudancas(saldo, total);
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
    salvarMudancas(saldo, total) {
        const botaoAdicionar = document.getElementById("adicionar");
        if (botaoAdicionar) {
            const novoBotao = botaoAdicionar.cloneNode(true);
            botaoAdicionar.parentNode?.replaceChild(novoBotao, botaoAdicionar);
            novoBotao.addEventListener('click', () => {
                Armazenador.salvar("saldo", saldo);
                Armazenador.salvar("total", total);
            });
        }
    }
}
export const conta = new Conta();
