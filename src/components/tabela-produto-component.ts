import { Armazenador } from "../types/Armazenador.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";

atualizarExtrato();

function excluirTransacoes(transacao: Transacao): void {

    const transacoes = Armazenador.obter<Transacao[]>("transacoes") || [];
    const novasTransacoes = transacoes.filter(t => t.idTransacao !== transacao.idTransacao);

    let saldo: number = parseFloat(Armazenador.obter("saldo") || "0");
    let total: number = parseFloat(Armazenador.obter("total") || "0");

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

function verificaBotao(transacao: Transacao): boolean{
    const botaoExcluir = document.getElementById("botaoExcluir");
    const nomeProduto = document.getElementById("nomeProduto");
    const quantidadeProduto = document.getElementById("quantidadeProduto");
    const valorProduto = document.getElementById("valorProduto");

    nomeProduto.textContent = `Produto : ${transacao.mercadoria}`;
    quantidadeProduto.textContent = `Quantidade : ${transacao.quantidade}`;
    valorProduto.textContent = `Produto : ${transacao.valor}`;

    if(botaoExcluir){
        botaoExcluir.addEventListener("click", () => {
            excluirTransacoes(transacao);
            return true;
        });
    }
    return false;
}

function atualizarExtrato(): void {
    const corpoTabela: HTMLTableSectionElement = document.getElementById("corpo_tabela") as HTMLTableSectionElement;
    corpoTabela.innerHTML = '';
    const transacoes = Armazenador.obter<Transacao[]>("transacoes") || [];

    transacoes.map(transacao => {
        const sinal = transacao.tipoTransacao == TipoTransacao.COMPRA ? '-' : '+';
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <th class="primeira_linha" scope="row">${sinal}</th>
            <td>${transacao.mercadoria}</td>
            <td>${transacao.quantidade}</td>
            <td>${formatarMoeda(transacao.valor)}</td>
            <td class="d-none d-md-flex justify-content-center"><button type="button" data-bs-toggle="modal" data-bs-target="#modalExcluir"><i class="bi bi-trash3 lixeira"></i></button></td>
        `

        const botaoExcluir = linha.querySelector(".lixeira"); 

        if (botaoExcluir) {
            botaoExcluir.addEventListener("click", (event) => {
                if(verificaBotao(transacao)){
                    const icone = event.target as HTMLElement;
                    const linha = icone.closest("tr");
                    if (linha) {
                        linha.remove();
                    }
                }
            })
        }

        corpoTabela.appendChild(linha);
    });
}

const ExtratoComponent = {
    atualizar() {
        atualizarExtrato();
    }
}
export default ExtratoComponent;