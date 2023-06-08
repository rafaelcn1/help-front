
export interface Tecnico {
    id?: any; // Pode ser tanto int quanto Integer, o ? nem sempre vai ter ID, por isso colocamos o ?
    nome: string;
    cpf: string;
    email: string;
    senha: string;
    perfis: string[]; //é um array, podendo ser admin, cliente
    dataCriacao: any; // Também pode ser date ou string
}
