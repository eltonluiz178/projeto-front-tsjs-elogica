import { Armazenador } from "../types/Armazenador.js";
import { conta } from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { formatarMoeda } from "../utils/formatters.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";

const corpoTabela: HTMLTableSectionElement = document.getElementById("corpo_tabela") as HTMLTableSectionElement;

atualizarExtrato();

function excluirTransacoes(nomeMercadoria: string): void {
    const transacoes = conta.retornaTransacoes();
    const novasTransacoes = transacoes.filter((transacao) => transacao.mercadoria !== nomeMercadoria);
    Armazenador.deletar("transacoes");
    Armazenador.salvar("transacoes", novasTransacoes);
}

function atualizarExtrato(): void {
    corpoTabela.innerHTML = '';

    const transacoes = conta.retornaTransacoes();

    transacoes.forEach(transacao => {
        const sinal = transacao.tipoTransacao == TipoTransacao.COMPRA ? '-' : '+';
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <th class="primeira_linha" scope="row">${sinal}</th>
            <td>${transacao.mercadoria}</td>
            <td>${transacao.quantidade}</td>
            <td>R$ ${formatarMoeda(transacao.valor)}</td>
            <td class="d-none d-md-block"><button type="button" data-bs-toggle="modal" data-bs-target="#modalExcluir"><i class="bi bi-trash3 lixeira"></i></button></td>
        `
        const lixeira = linha.querySelector(".lixeira");

        if(lixeira){
            lixeira.addEventListener("click",(event) => {
                const icone = event.target as HTMLElement;
                const linha2 = icone.closest("tr");
                if(linha2){
                    linha2.remove();
                }
                excluirTransacoes(transacao.mercadoria);
                SaldoComponent.atualizar();
                TotalComponent.atualizar();
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