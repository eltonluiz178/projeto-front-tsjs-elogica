import { conta } from "../types/Conta.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { aplicarMascaraMonetaria, formatarMoeda, mascaraQuantidade, removerMascaraMonetaria } from "../utils/formatters.js";
import { Validacao } from "../types/Decorators.js";
declare const bootstrap: any;

const elementoFormulario = document.getElementById("formulario") as HTMLFormElement;
const modalAdicionar = new bootstrap.Modal(document.getElementById("modalAdicionar")!);
const inputValor = elementoFormulario.querySelector("#inputValor") as HTMLInputElement;
const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade") as HTMLInputElement;
const botaoLimpar = document.querySelector("#botaoLimpar") as HTMLLinkElement;

botaoLimpar.addEventListener("click", () => {
    limparFormulario();
});

if (inputValor) {
    inputValor.addEventListener("input", () => {
        aplicarMascaraMonetaria(inputValor);
    });
}

if (inputQuantidade) {
    inputQuantidade.addEventListener("input", () => {
        mascaraQuantidade(inputQuantidade);
    });
}

// Função para limpar o formulário
function limparFormulario() {
    elementoFormulario.reset();
    if (inputValor) {
        aplicarMascaraMonetaria(inputValor);
    }
    if(inputQuantidade){
        mascaraQuantidade(inputQuantidade);
    }
}

// Função para preparar e mostrar o modal de confirmação
function prepararModalConfirmacao(transacao: Transacao) {
    document.getElementById("nomeProdutoAdicionar").textContent = `Produto: ${transacao.mercadoria}`;
    document.getElementById("quantidadeProdutoAdicionar").textContent = `Quantidade: ${transacao.quantidade}`;
    document.getElementById("valorProdutoAdicionar").textContent = `Valor: ${formatarMoeda(transacao.valor)}`;
    modalAdicionar.show();

    const botaoAdicionar = document.getElementById("adicionar");
    const botaoCancelar = document.getElementById("cancelar"); // Botão "Cancelar" do modal

    // Função para adicionar a transação
    const adicionarTransacao = () => {
        try {
            conta.registrarTransacao(transacao);

            // Atualiza os componentes
            ExtratoComponent.atualizar();
            SaldoComponent.atualizar();
            TotalComponent.atualizar();

            // Fecha o modal e limpa o formulário
            modalAdicionar.hide();
            limparFormulario();
        } catch (erro) {
            alert(erro.message);
        } finally {
            botaoAdicionar.removeEventListener("click", adicionarTransacao);
        }
    };

    // Adiciona o evento de clique ao botão "Adicionar"
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", adicionarTransacao);
    }

    // Remove o evento de clique se o modal for cancelado
    if (botaoCancelar) {
        botaoCancelar.addEventListener("click", () => {
            botaoAdicionar.removeEventListener("click", adicionarTransacao);
            modalAdicionar.hide();
        });
    }

    // Remove o evento de clique se o modal for fechado de outra forma
    modalAdicionar._element.addEventListener("hidden.bs.modal", () => {
        botaoAdicionar.removeEventListener("click", adicionarTransacao);
    });
}

// Função para obter os dados do formulário
function obterTransacaoDoFormulario(): Transacao | null {
    try {
        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao") as HTMLSelectElement;
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria") as HTMLInputElement;

        const tipoTransacao = inputTipoTransacao.value as TipoTransacao;
        const mercadoria = inputMercadoria.value;
        const quantidade = removerMascaraMonetaria(inputQuantidade.value);
        const valor = removerMascaraMonetaria(inputValor.value);

        const novaTransacao = new Transacao(
            tipoTransacao,
            mercadoria,
            quantidade,
            valor
        )

        Validacao(novaTransacao);

        return novaTransacao;
    } catch (erro) {
        alert(erro.message);
        return null;
    }
}

// Configura o evento de envio do formulário
elementoFormulario?.addEventListener("submit", function (event) {
    event.preventDefault();
    try {
        if (!elementoFormulario.checkValidity()) {
            throw new Error("Preencha todos os campos do formulário!");
        }

        const transacao = obterTransacaoDoFormulario();
        if (transacao) {
            prepararModalConfirmacao(transacao);
        }
    } catch (erro) {
        alert(erro.message);
    }
});