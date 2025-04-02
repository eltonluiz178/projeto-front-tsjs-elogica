export function Validacao(transacao) {
    if (transacao.quantidade <= 0 || !transacao.quantidade) {
        throw new Error("Quantidade é inválida!");
    }
    if (transacao.valor <= 0 || !transacao.valor) {
        throw new Error("Valor do produto é inválido!");
    }
    if (!transacao.mercadoria) {
        throw new Error("Nome do Produto é inválido!");
    }
    if (transacao.mercadoria.length > 35 || transacao.mercadoria.length < 3) {
        throw new Error("Nome do Produto não pode possuir mais de 35 ou menos que 3 caracteres.");
    }
}
