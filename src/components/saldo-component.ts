import { conta } from "../types/Conta.js";
import { formatarMoeda } from "../utils/formatters.js";

const elementoSaldo = document.getElementById("saldo") as HTMLElement;
const elementoTotal = document.getElementById("total") as HTMLElement;

renderizarSaldo();
renderizarTotal();

export function renderizarSaldo() : void {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(conta.getSaldo());
    }
}

export function renderizarTotal() : void {
    if (elementoTotal != null){
        elementoTotal.textContent = formatarMoeda(conta.getTotal());
    }
}

export const TotalComponent = {
    atualizar(){
        renderizarTotal();
    }
}

export const SaldoComponent = {
    atualizar(){
        renderizarSaldo();
    }
}
