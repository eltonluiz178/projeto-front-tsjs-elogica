import { Armazenador } from "./Armazenador.js";
import { ValidaCompra, ValidaVenda } from "./Decorators.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
    protected total: number = Armazenador.obter<number>("total") || 0;
    protected saldo: number = Armazenador.obter<number>("saldo") || 0;
    protected transacoes: Transacao[] = Armazenador.obter<Transacao[]>("transacoes") || [];
    
    constructor(){
    }

    getTotal(): number{
        return this.total;
    }

    getSaldo(): number{
        return this.saldo;
    }

    @ValidaCompra
    compra(quantidade: number, valor: number, saldo: number): void{
        const valorCompra = quantidade * valor;
        this.total -= valorCompra;
        this.saldo -= valorCompra;
        Armazenador.salvar("total",this.saldo);
        Armazenador.salvar("saldo",this.saldo);
    }

    @ValidaVenda
    venda(quantidade: number, valor: number): void{
        const valorVenda = quantidade * valor;
        this.total += valorVenda;
        this.saldo += valorVenda;
        Armazenador.salvar("total",this.total);
        Armazenador.salvar("saldo",this.saldo);
    }

    retornaTransacoes(): Transacao[]{
        return this.transacoes;
    }

    registrarTransacao(novaTransacao : Transacao): void {
        if(novaTransacao.tipoTransacao == TipoTransacao.COMPRA){
            this.compra(novaTransacao.quantidade,novaTransacao.valor,this.total);
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.VENDA){
            this.venda(novaTransacao.quantidade,novaTransacao.valor);
        }
        else{
            throw new Error("Tipo de transação inválido.")
        }
        this.transacoes.push(novaTransacao);
        Armazenador.salvar("transacoes",this.transacoes);
    }
}

export const conta = new Conta();

