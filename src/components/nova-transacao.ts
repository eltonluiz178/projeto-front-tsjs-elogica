import { conta } from "../types/Conta.js";
import { Validacao } from "../types/Decorators.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { aplicarMascaraMonetaria, formatarMoeda, removerMascaraMonetaria } from "../utils/formatters.js";
declare const bootstrap: any;

const elementoFormulario = document.getElementById("formulario") as HTMLFormElement;
const modalAdicionar = new bootstrap.Modal(document.getElementById("modalAdicionar")!);
const botaoAdicionar = document.getElementById("adicionar");
const inputValor = elementoFormulario.querySelector("#inputValor") as HTMLInputElement;

if (inputValor) {
    inputValor.addEventListener("input", () => {
        aplicarMascaraMonetaria(inputValor);
    });
}

let transacaoPendente: Transacao | null = null;

if (botaoAdicionar) {
    botaoAdicionar.addEventListener("click", () => {
        if (transacaoPendente) {
            conta.registrarTransacao(transacaoPendente);

            ExtratoComponent.atualizar();
            SaldoComponent.atualizar();
            TotalComponent.atualizar();

            transacaoPendente = null;

            modalAdicionar.hide();
        }
    });
}

elementoFormulario?.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            throw new Error("Preencha todos os campos do formulário !");
        }

        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao") as HTMLSelectElement;
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria") as HTMLInputElement;
        const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let mercadoria: string = inputMercadoria.value;
        let quantidade: number = inputQuantidade.valueAsNumber;
        let valor: number = removerMascaraMonetaria(inputValor.value);

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        };

        Validacao(novaTransacao);

        transacaoPendente = novaTransacao;

        document.getElementById("nomeProdutoAdicionar").textContent = `Produto : ${novaTransacao.mercadoria}`;
        document.getElementById("quantidadeProdutoAdicionar").textContent = `Quantidade : ${novaTransacao.quantidade}`;
        document.getElementById("valorProdutoAdicionar").textContent = `Valor : ${formatarMoeda(novaTransacao.valor)}`;

        modalAdicionar.show();
    } catch (erro) {
        alert(erro.message);
    }
});