import { Armazenador } from "../types/Armazenador.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
atualizarExtrato();
function excluirTransacoes(transacao) {
    const transacoes = Armazenador.obter("transacoes") || [];
    const novasTransacoes = transacoes.filter(t => t.idTransacao !== transacao.idTransacao);
    let saldo = parseFloat(Armazenador.obter("saldo") || "0");
    let total = parseFloat(Armazenador.obter("total") || "0");
    if (transacao.tipoTransacao == TipoTransacao.COMPRA) {
        saldo += transacao.valor * transacao.quantidade;
        total += transacao.valor * transacao.quantidade;
    }
    else {
        saldo -= transacao.valor * transacao.quantidade;
        total -= transacao.valor * transacao.quantidade;
    }
    Armazenador.deletar("transacoes");
    Armazenador.deletar("saldo");
    Armazenador.deletar("total");
    Armazenador.salvar("transacoes", novasTransacoes);
    Armazenador.salvar("saldo", saldo);
    Armazenador.salvar("total", total);
    atualizarExtrato();
    SaldoComponent.atualizar();
    TotalComponent.atualizar();
}
function verificaBotao(transacao) {
    const botaoExcluir = document.getElementById("botaoExcluir");
    const nomeProduto = document.getElementById("nomeProduto");
    const quantidadeProduto = document.getElementById("quantidadeProduto");
    const valorProduto = document.getElementById("valorProduto");
    nomeProduto.textContent = `Produto : ${transacao.mercadoria}`;
    quantidadeProduto.textContent = `Quantidade : ${transacao.quantidade}`;
    valorProduto.textContent = `Produto : ${transacao.valor}`;
    if (botaoExcluir) {
        botaoExcluir.addEventListener("click", () => {
            excluirTransacoes(transacao);
            return true;
        });
    }
    return false;
}
function atualizarExtrato() {
    const corpoTabela = document.getElementById("corpo_tabela");
    corpoTabela.innerHTML = '';
    const transacoes = Armazenador.obter("transacoes") || [];
    transacoes.map(transacao => {
        const sinal = transacao.tipoTransacao == TipoTransacao.COMPRA ? '-' : '+';
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <th class="primeira_linha" scope="row">${sinal}</th>
            <td>${transacao.mercadoria}</td>
            <td>${transacao.quantidade}</td>
            <td>${formatarMoeda(transacao.valor)}</td>
            <td class="d-none d-md-flex justify-content-center"><button type="button" data-bs-toggle="modal" data-bs-target="#modalExcluir"><i class="bi bi-trash3 lixeira"></i></button></td>
        `;
        const botaoExcluir = linha.querySelector(".lixeira");
        if (botaoExcluir) {
            botaoExcluir.addEventListener("click", (event) => {
                if (verificaBotao(transacao)) {
                    const icone = event.target;
                    const linha = icone.closest("tr");
                    if (linha) {
                        linha.remove();
                    }
                }
            });
        }
        corpoTabela.appendChild(linha);
    });
}
const ExtratoComponent = {
    atualizar() {
        atualizarExtrato();
    }
};
export default ExtratoComponent;
