import { Transacao } from "../types/Transacao";

const elementoFormulario = document.getElementById("#formulario") as HTMLFormElement;
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

        let tipoTransacao: string = inputTipoTransacao.value;
        let mercadoria: string = inputMercadoria.value;
        let quantidade: number = inputQuantidade.valueAsNumber;
        let valor: number = inputValor.valueAsNumber;

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        }

    }
    catch (erro) {
        alert(erro.message);
    }
});