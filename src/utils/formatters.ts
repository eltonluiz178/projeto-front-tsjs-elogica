export function formatarMoeda(valor: number): string {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}

export function aplicarMascaraMonetaria(input: HTMLInputElement): void {
    let valor = input.value;

    valor = valor.replace(/\D/g, "");

    const valorNumerico = parseFloat(valor) / 100 || 0;
    const valorFormatado = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(valorNumerico);

    input.value = valorFormatado;
}

export function removerMascaraMonetaria(valorFormatado: string): number {
    const valorNumerico = valorFormatado
        .replace(/[^\d,-]/g, "")
        .replace(",", ".");

    return parseFloat(valorNumerico) || 0;
}