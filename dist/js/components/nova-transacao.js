import { conta } from "../types/Conta.js";
import { SaldoComponent, TotalComponent } from "./saldo-component.js";
import ExtratoComponent from "./tabela-produto-component.js";
import { aplicarMascaraMonetaria, formatarMoeda, removerMascaraMonetaria } from "../utils/formatters.js";
const elementoFormulario = document.getElementById("formulario");
const modalAdicionar = new bootstrap.Modal(document.getElementById("modalAdicionar"));
const inputValor = elementoFormulario.querySelector("#inputValor");
if (inputValor) {
    inputValor.addEventListener("input", () => {
        aplicarMascaraMonetaria(inputValor);
    });
}
// Função para limpar o formulário
function limparFormulario() {
    elementoFormulario.reset();
    if (inputValor) {
        aplicarMascaraMonetaria(inputValor);
    }
}
// Função para preparar e mostrar o modal de confirmação
function prepararModalConfirmacao(transacao) {
    document.getElementById("nomeProdutoAdicionar").textContent = `Produto: ${transacao.mercadoria}`;
    document.getElementById("quantidadeProdutoAdicionar").textContent = `Quantidade: ${transacao.quantidade}`;
    document.getElementById("valorProdutoAdicionar").textContent = `Valor: ${formatarMoeda(transacao.valor)}`;
    modalAdicionar.show();
    const botaoAdicionar = document.getElementById("adicionar");
    // Verifica se o botão existe antes de tentar manipulá-lo
    if (botaoAdicionar) {
        botaoAdicionar.addEventListener("click", () => {
            try {
                conta.registrarTransacao(transacao);
                // Atualiza os componentes
                ExtratoComponent.atualizar();
                SaldoComponent.atualizar();
                TotalComponent.atualizar();
                // Fecha o modal e limpa o formulário
                modalAdicionar.hide();
                limparFormulario();
            }
            catch (erro) {
                alert(erro.message);
            }
        });
    }
    else {
        console.error("O elemento pai do botão 'Adicionar' não foi encontrado no DOM.");
    }
}
// Função para obter os dados do formulário
function obterTransacaoDoFormulario() {
    try {
        const inputTipoTransacao = elementoFormulario.querySelector("#inputTransacao");
        const inputMercadoria = elementoFormulario.querySelector("#inputMercadoria");
        const inputQuantidade = elementoFormulario.querySelector("#inputQuantidade");
        return {
            tipoTransacao: inputTipoTransacao.value,
            mercadoria: inputMercadoria.value,
            quantidade: inputQuantidade.valueAsNumber,
            valor: removerMascaraMonetaria(inputValor.value)
        };
    }
    catch (erro) {
        console.error("Erro ao obter dados do formulário:", erro);
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
    }
    catch (erro) {
        alert(erro.message);
    }
});
