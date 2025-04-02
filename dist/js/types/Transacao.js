export class Transacao {
    tipoTransacao;
    mercadoria;
    quantidade;
    valor;
    idTransacao;
    constructor(tipoTransacao, mercadoria, quantidade, valor) {
        this.tipoTransacao = tipoTransacao;
        this.mercadoria = mercadoria;
        this.quantidade = quantidade;
        this.valor = valor;
        this.idTransacao = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
