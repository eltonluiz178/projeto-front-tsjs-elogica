import { Armazenador } from "../types/Armazenador.js";
import { formatarMoeda } from "../utils/formatters.js";

const elementoSaldo = document.getElementById("saldo") as HTMLElement;
const elementoTotal = document.getElementById("total") as HTMLElement;

renderizarSaldo();
renderizarTotal();

export function renderizarSaldo() : void {
    if (elementoSaldo != null) {
        const saldo = Armazenador.obter<number>("saldo") || 0;
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}

export function renderizarTotal() : void {
    if (elementoTotal != null){
        const total = Armazenador.obter<number>("total") || 0;
        elementoTotal.textContent = formatarMoeda(total);
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