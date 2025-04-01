import { Armazenador } from "../types/Armazenador.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
const corpoTabela = document.getElementById("corpo_tabela");
atualizarExtrato();
function excluirTransacoes(transacao) {
    document.getElementById("nomeProduto").textContent = `Produto : ${transacao.mercadoria}`;
    document.getElementById("quantidadeProduto").textContent = `Quantidade : ${transacao.quantidade}`;
    document.getElementById("valorProduto").textContent = `Valor : ${formatarMoeda(transacao.valor)}`;
    const botaoLixeira = document.getElementById("lixeira");
    if (botaoLixeira) {
        // Remove listeners anteriores para evitar duplicação
        const novoBotao = botaoLixeira.cloneNode(true);
        botaoLixeira.parentNode?.replaceChild(novoBotao, botaoLixeira);
        // Adiciona um único listener ao novo botão
        novoBotao.addEventListener('click', () => {
            const transacoes = Armazenador.obter("transacoes") || [];
            const novasTransacoes = transacoes.filter(t => t.mercadoria !== transacao.mercadoria);
            Armazenador.deletar("transacoes");
            Armazenador.salvar("transacoes", novasTransacoes);
            SaldoComponent.atualizar();
            TotalComponent.atualizar();
            atualizarExtrato();
        });
    }
}
function atualizarExtrato() {
    corpoTabela.innerHTML = '';
    const transacoes = Armazenador.obter("transacoes") || [];
    transacoes.forEach(transacao => {
        const sinal = transacao.tipoTransacao == TipoTransacao.COMPRA ? '-' : '+';
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <th class="primeira_linha" scope="row">${sinal}</th>
            <td>${transacao.mercadoria}</td>
            <td>${transacao.quantidade}</td>
            <td>${formatarMoeda(transacao.valor)}</td>
            <td class="d-none d-md-flex justify-content-center"><button type="button" data-bs-toggle="modal" data-bs-target="#modalExcluir"><i class="bi bi-trash3 lixeira"></i></button></td>
        `;
        excluirTransacoes(transacao);
        corpoTabela.appendChild(linha);
    });
}
const ExtratoComponent = {
    atualizar() {
        atualizarExtrato();
    }
};
export default ExtratoComponent;
