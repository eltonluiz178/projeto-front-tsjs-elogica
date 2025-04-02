export function ValidaCompra(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (quantidade: number, valor: number){
        if(quantidade <= 0 || !quantidade) {
            throw new Error("Quantidade é inválida!");
        }

        if(valor <= 0 || !valor) {
            throw new Error("Valor do produto é inválido!");
        }
        
        return originalMethod.apply(this, [quantidade, valor]);
    }
    return descriptor;
}

export function ValidaVenda(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (quantidade: number, valor: number){
        if(quantidade <= 0 || !quantidade) {
            throw new Error("Quantidade é inválida!");
        }

        if(valor <= 0 || !valor) {
            throw new Error("Valor do produto é inválido!");
        }
        return originalMethod.apply(this, [quantidade, valor]);
    }
    return descriptor;
}

export function ValidaNome (mercadoria: string): void{
    if(!mercadoria){
        throw new Error("Nome do Produto é inválido!");
    }

    if(mercadoria.length > 35 || mercadoria.length < 3){
        throw new Error("Nome do Produto não pode possuir mais de 35 ou menos que 3 caracteres.");
    }
}

