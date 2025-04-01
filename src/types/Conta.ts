import { Armazenador } from "./Armazenador.js";
import { ValidaCompra, ValidaVenda } from "./Decorators.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
    protected total: number = Armazenador.obter<number>("total") || 0;
    protected saldo: number = Armazenador.obter<number>("saldo") || 0;
    protected transacoes: Transacao[] = Armazenador.obter<Transacao[]>("transacoes") || [];

    constructor() {
    }

    getTotal(): number {
        return this.total;
    }

    getSaldo(): number {
        return this.saldo;
    }

    @ValidaCompra
    compra(quantidade: number, valor: number, saldo: number): void {
        const valorCompra = quantidade * valor;
        this.saldo -= valorCompra;
        this.total -= valorCompra;
        this.salvarMudancas(this.saldo, this.total);
    }

    @ValidaVenda
    venda(quantidade: number, valor: number): void {
        const valorVenda = quantidade * valor;
        this.saldo += valorVenda;
        this.total += valorVenda;
        this.salvarMudancas(this.saldo, this.total);
    }

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.COMPRA) {
            this.compra(novaTransacao.quantidade, novaTransacao.valor, this.total);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.VENDA) {
            this.venda(novaTransacao.quantidade, novaTransacao.valor);
        }
        else {
            throw new Error("Tipo de transação inválido.")
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes", this.transacoes);
    }

    salvarMudancas(saldo: number, total: number): void {
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

