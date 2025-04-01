import { conta } from "../types/Conta.js";
import { ValidaNome } from "../types/Decorators.js";
import { SaldoComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
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
        let valor = inputValor.valueAsNumber;
        ValidaNome(mercadoria);
        const novaTransacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        };
        conta.registrarTransacao(novaTransacao);
        ExtratoComponent.atualizar();
        SaldoComponent.atualizar();
        console.log(quantidade, valor);
    }
    catch (erro) {
        alert(erro.message);
    }
});
