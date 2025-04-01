import { conta } from "../types/Conta.js";
import { ValidaNome } from "../types/Decorators.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { formatarMoeda } from "../utils/formatters.js";
const elementoFormulario = document.getElementById("formulario");
elementoFormulario?.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            throw new Error("Preencha todos os campos do formulário !");
        }
        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao");
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria");
        const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade");
        const inputValor = elementoFormulario.querySelector("#inputValor");
        let tipoTransacao = inputTipoTransacao.value;
        let mercadoria = inputMercadoria.value;
        let quantidade = inputQuantidade.valueAsNumber;
        let valor = parseFloat(inputValor.value);
        ValidaNome(mercadoria);
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        };
        document.getElementById("nomeProdutoAdicionar").textContent = `Produto : ${novaTransacao.mercadoria}`;
        document.getElementById("quantidadeProdutoAdicionar").textContent = `Quantidade : ${novaTransacao.quantidade}`;
        document.getElementById("valorProdutoAdicionar").textContent = `Valor : ${formatarMoeda(novaTransacao.valor)}`;
        conta.registrarTransacao(novaTransacao);
        ExtratoComponent.atualizar();
        SaldoComponent.atualizar();
        TotalComponent.atualizar();
    }
    catch (erro) {
        alert(erro.message);
    }
});
