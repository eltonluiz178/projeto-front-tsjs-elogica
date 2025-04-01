import { conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";
const elementoSaldo = document.getElementById("saldo");
const elementoTotal = document.getElementById("total");
renderizarSaldo();
renderizarTotal();
export function renderizarSaldo() {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    }
}
export function renderizarTotal() {
    if (elementoTotal != null) {
        elementoTotal.textContent = formatarMoeda(conta.getTotal());
    }
}
export const TotalComponent = {
    atualizar() {
        renderizarTotal();
    }
};
export const SaldoComponent = {
    atualizar() {
        renderizarSaldo();
    }
};
