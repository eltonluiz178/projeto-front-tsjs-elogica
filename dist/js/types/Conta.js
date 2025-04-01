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
    total = Armazenador.obter("total") || 0;
    saldo = Armazenador.obter("saldo") || 0;
    transacoes = Armazenador.obter("transacoes") || [];
    constructor() {
    }
    getTotal() {
        return this.total;
    }
    getSaldo() {
        return this.saldo;
    }
    compra(quantidade, valor, saldo) {
        const valorCompra = quantidade * valor;
        this.saldo -= valorCompra;
        this.total -= valorCompra;
        this.salvarMudancas(this.saldo, this.total);
    }
    venda(quantidade, valor) {
        const valorVenda = quantidade * valor;
        this.saldo += valorVenda;
        this.total += valorVenda;
        this.salvarMudancas(this.saldo, this.total);
    }
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.COMPRA) {
            this.compra(novaTransacao.quantidade, novaTransacao.valor, this.total);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.VENDA) {
            this.venda(novaTransacao.quantidade, novaTransacao.valor);
        }
        else {
            throw new Error("Tipo de transação inválido.");
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", this.transacoes);
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
