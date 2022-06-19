import { NOMEM } from "dns";

export class PessoaDto {
    nome: string;
    cpf: string;
    pesoIdeal: string;

    constructor(nome: string, cpf: string, pesoIdeal: string) {
        this.nome = nome;
        this.cpf = cpf;
        this.pesoIdeal = pesoIdeal;
    }
}

export class Pessoa {
    nome: string;
    dataNasc: Date;
    cpf: string;
    sexo: string;
    altura: string;
    peso: string;

    constructor(
        nome: string,
        dataNasc: Date,
        cpf: string,
        sexo: string,
        altura: string,
        peso: string
    ) {
        this.nome = nome;
        this.cpf = cpf;
        this.dataNasc = dataNasc;
        this.altura = altura;
        this.peso = peso;
        this.sexo = sexo;
    }

    toString(): string {
        let texto =
            `nome: ${this.nome}\n` +
            `cpf: ${this.cpf}\n` +
            `nascimento: ${this.dataNasc}\n` +
            `altura: ${this.altura}\n` +
            `peso: ${this.peso}\n`;
        return texto;
    }
}
