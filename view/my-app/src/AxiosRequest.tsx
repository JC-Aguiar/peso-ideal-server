import axios, {AxiosRequestHeaders,} from "./axios";
import { Pessoa } from './Pessoa';

const headers: AxiosRequestHeaders = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Max-Age": "60000",
};

export function responseCheck(response: Response) {
    if (response.status < 200 || response.status >= 300) {
        throw new Error(response.statusText);
    }
}

export function statusCheck(status: number) {
    if (status < 200 || status >= 300) {
        throw new Error(`Status ${status}`);
    }
}


export async function addPessoa(pessoa: Pessoa): Promise<Pessoa> {
    return await axios
        .post("http://localhost:8017/api/incluir", { pessoa }, headers)
        .then((response) => {
            const data = response.data;
            console.log(`[AxiosRequest] \n\t response: ${data}`);
            return data;
        })
        .catch((erro) => {
            console.log(erro);
        });
}

export async function testeConexao(): Promise<{text: string;}> {
    return await axios
        .get("http://localhost:8017/api/teste", headers)
        .then((response) => {
            const data = response.data;
            console.log(`[AxiosRequest] \n\t response: ${data}`);
            return data;
        })
        .catch((erro) => {
            console.log(erro);
        });
}
