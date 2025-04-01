import { conta } from "../types/Conta.js";
import { ValidaNome } from "../types/Decorators.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { formatarMoeda } from "../utils/formatters.js";

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
        let valor: number = parseFloat(inputValor.value);

        ValidaNome(mercadoria);

        const novaTransacao: Transacao = {
            tipoTransacao: tipoTransacao,
            mercadoria: mercadoria,
            quantidade: quantidade,
            valor: valor
        }

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