import { conta } from "../types/Conta.js";
import { ValidaNome } from "../types/Decorators.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { SaldoComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";

const elementoFormulario = document.getElementById("formulario") as HTMLFormElement;
elementoFormulario?.addEventListener("submit", function (event) {
    event.preventDefault();
    try 
    {
        if (!elementoFormulario.checkValidity()) {
            throw new Error("Preencha todos os campos do formulário !");
        }

        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao") as HTMLSelectElement;
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria") as HTMLInputElement;
        const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade") as HTMLInputElement;
        const inputValor = elementoFormulario.querySelector("#inputValor") as HTMLInputElement;

        let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao;
        let mercadoria: string = inputMercadoria.value;
        let quantidade: number = inputQuantidade.valueAsNumber;
        let valor: number = inputValor.valueAsNumber;

        ValidaNome(mercadoria);

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        }

        conta.registrarTransacao(novaTransacao);
        ExtratoComponent.atualizar();
        SaldoComponent.atualizar();
        console.log(quantidade, valor);

    }
    catch (erro) {
        alert(erro.message);
    }
});