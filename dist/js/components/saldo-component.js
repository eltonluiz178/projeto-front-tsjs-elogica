import { Armazenador } from "../types/Armazenador.js";
import { formatarMoeda } from "../utils/formatters.js";
const elementoSaldo = document.getElementById("saldo");
const elementoTotal = document.getElementById("total");
renderizarSaldo();
renderizarTotal();
export function renderizarSaldo() {
    if (elementoSaldo != null) {
        const saldo = Armazenador.obter("saldo") || 0;
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}
export function renderizarTotal() {
    if (elementoTotal != null) {
        const total = Armazenador.obter("total") || 0;
        elementoTotal.textContent = formatarMoeda(total);
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
