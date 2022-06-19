    export function nomeCompletoAleatorio(): string {
        return nomeAleatorio() + " " + sobrenomeAleatorio();
    }

    export function nomeAleatorio(): string {
        let aleatorio = Math.floor(Math.random() * 30 + Math.random());
        let nome;
        switch(aleatorio) {
            case 0:  nome = "Jonas"; break;
            case 1:  nome = "José"; break;
            case 2:  nome = "João"; break;
            case 3:  nome = "Mauricio"; break;
            case 4:  nome = "Pedro"; break;
            case 5:  nome = "André"; break;
            case 6:  nome = "Paulo"; break;
            case 7:  nome = "Henrique"; break;
            case 8:  nome = "Juliana"; break;
            case 9:  nome = "Maria"; break;
            case 10: nome =  "Gabrielle"; break;
            case 11: nome =  "Daniella"; break;
            case 12: nome =  "Eduarda"; break;
            case 13: nome =  "Juliana"; break;
            case 14: nome =  "Clóvis"; break;
            case 15: nome =  "Pedro"; break;
            case 16: nome =  "Carlos"; break;
            case 17: nome =  "Antônio"; break;
            case 18: nome =  "Oswaldo"; break;
            case 19: nome =  "Adriano"; break;
            case 20: nome =  "Carla"; break;
            case 21: nome =  "Jéssica"; break;
            case 22: nome =  "Vanessa"; break;
            case 23: nome =  "Eliane"; break;
            case 24: nome =  "Eleonora"; break;
            case 25: nome =  "Eloisa"; break;
            case 26: nome =  "Elinir"; break;
            case 27: nome =  "Emílio"; break;
            case 28: nome =  "Gabriel"; break;
            case 29: nome =  "Patrícia"; break;
            case 30: nome =  "Isabela"; break;
            case 31: nome =  "Fernanda"; break;
            case 32: nome =  "Lilian"; break;
            case 33: nome =  "Renata"; break;
            case 34: nome =  "Adolpho"; break;
            case 35: nome =  "Roberto"; break;
            case 36: nome =  "Luis"; break;
            default: nome =  "Jesus"; break;
        }
        return nome;
    }

    export function sobrenomeAleatorio(): string {
        let aleatorio = Math.floor(Math.random() * 20 + Math.random());
        switch(aleatorio) {
            case 0: return "Costal";
            case 1: return "Aguiar";
            case 2: return "Bonadil";
            case 3: return "Noronha";
            case 4: return "Barreto";
            case 5: return "Assis";
            case 6: return "Azeredo";
            case 7: return "Lopes";
            case 8: return "Pereira";
            case 9: return "Aranha";
            case 10: return "Longo";
            case 11: return "Mello";
            case 12: return "Budino";
            case 13: return "Balbino";
            case 14: return "Oliveira";
            case 15: return "Santos";
            case 16: return "Souza";
            case 17: return "Rodrigues";
            case 18: return "Ferreira";
            case 19: return "Alves";
            case 20: return "Lima";
            case 21: return "Gomes";
            case 22: return "Ribeiro";
            case 23: return "Martins";
            case 24: return "Andrade";
            case 25: return "Barbosa";
            case 26: return "Barros";
            case 27: return "Batista";
            default: return "Borges";
        }
    }

    export function cpfAleatorio(): string {
        let cpf = "";
        while(cpf.length <= 10) {
            cpf += Math.round(Math.random() * 10);
        }
        return cpf;
    }

    export function sexoAleatorio(): string {
        return (Math.round(Math.random()*10) % 2 === 0) ? "M" : "F";
    }

    export function alturaAleatorio(): string {
        let altura = Math.floor(
            (Math.random() + 0.3) * 10 + Math.random() + 70
        );
        altura = altura > 194 ? 194 : altura;
        altura = altura < 140 ? 140 : altura;
        return "" + altura;
    }

    export function pesoAleatorio(): string {
        return "" + Math.round((Math.random() + 0.5) * 20 + Math.random()*5 + 35);
    }
