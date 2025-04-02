var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Armazenador } from "./Armazenador.js";
import { ValidaCompra, ValidaVenda } from "./Decorators.js";
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
__decorate([
    ValidaCompra
], Conta.prototype, "compra", null);
__decorate([
    ValidaVenda
], Conta.prototype, "venda", null);
export const conta = new Conta();
