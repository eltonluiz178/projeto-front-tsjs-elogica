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
        this.total -= valorCompra;
        this.saldo -= valorCompra;
        Armazenador.salvar("total", this.saldo);
        Armazenador.salvar("saldo", this.saldo);
    }
    venda(quantidade, valor) {
        const valorVenda = quantidade * valor;
        this.total += valorVenda;
        this.saldo += valorVenda;
        Armazenador.salvar("total", this.total);
        Armazenador.salvar("saldo", this.saldo);
    }
    retornaTransacoes() {
        return this.transacoes;
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
}
__decorate([
    ValidaCompra
], Conta.prototype, "compra", null);
__decorate([
    ValidaVenda
], Conta.prototype, "venda", null);
export const conta = new Conta();
