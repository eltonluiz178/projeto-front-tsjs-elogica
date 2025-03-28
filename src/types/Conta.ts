import { Armazenador } from "./Armazenador";

export class Conta {
    protected saldo: number = Armazenador.obter<number>("saldo") || 0;
    
}