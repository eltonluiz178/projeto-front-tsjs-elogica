import { conta } from "../types/Conta.js";
import { Validacao } from "../types/Decorators.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { aplicarMascaraMonetaria, formatarMoeda, removerMascaraMonetaria } from "../utils/formatters.js";
const elementoFormulario = document.getElementById("formulario");
const modalAdicionar = new bootstrap.Modal(document.getElementById("modalAdicionar"));
const botaoAdicionar = document.getElementById("adicionar");
const inputValor = elementoFormulario.querySelector("#inputValor");
if (inputValor) {
    inputValor.addEventListener("input", () => {
        aplicarMascaraMonetaria(inputValor);
    });
}
let transacaoPendente = null;
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
        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao");
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria");
        const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade");
        let tipoTransacao = inputTipoTransacao.value;
        let mercadoria = inputMercadoria.value;
        let quantidade = inputQuantidade.valueAsNumber;
        let valor = removerMascaraMonetaria(inputValor.value);
        const novaTransacao = {
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
    }
    catch (erro) {
        alert(erro.message);
    }
});
