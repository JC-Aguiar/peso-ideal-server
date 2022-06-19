import React, {useState, useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import * as AxiosRequest from './AxiosRequest';
import { Pessoa, PessoaDto } from "./Pessoa";
import axios, { AxiosRequestHeaders } from "axios";
import { alturaAleatorio, cpfAleatorio, nomeAleatorio, nomeCompletoAleatorio, pesoAleatorio, sexoAleatorio, sobrenomeAleatorio } from "./axios/Util";


const App = (props: any) => {

    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [sexo, setSexo] = useState('M');
    const [dataNasc, setdataNasc] = useState("");
    const [altura, setAltura] = useState("");
    const [peso, setPeso] = useState("");
    const [pesquisa, setPesquisa] = useState("");
    const [lista, setLista] = useState<PessoaDto[]>();

    const listarPessoas = () => {
        axios
            .get("http://localhost:8017/api/listar")
            .then(async (resposta) => {
                let pessoas: PessoaDto[] = resposta.data;
                setLista(pessoas);
            })
            .catch((erro) => console.log(erro));
    };

    const deletarPessoas = (cpf: string) => {
        axios
            .delete(`http://localhost:8017/api/deletar/${cpf}`)
            .then(async (resposta) => {
                alert(resposta.data);
                listarPessoas();
            })
            .catch((erro) => console.log(erro));
    };

    useEffect(() => {
        listarPessoas();
    }, []);

    function autoload() {
        setNome(nomeCompletoAleatorio());
        setCpf(cpfAleatorio());
        setAltura(alturaAleatorio());
        setPeso(pesoAleatorio());
    }

    async function pesquisar(txtNome: string) {
        axios
            .get(`http://localhost:8017/api/buscar/${txtNome}`)
            .then(async (resposta) => {
                const pessoaBusca: PessoaDto[] = resposta.data;
                setLista(pessoaBusca);
            })
            .catch((erro) => console.log(erro));
    }

    async function resetPesquisa() {
        setPesquisa("");
        listarPessoas();
    }

    function limparFormulario() {
        setNome("");
        setCpf("");
        setSexo("");
        setAltura("");
        setPeso("");
    }

    function printLog() {
        console.log("nome: " + nome);
        console.log("cpf: " + cpf);
        console.log("data nascimento: " + dataNasc);
        console.log("sexo: " + sexo);
        console.log("altura: " + altura);
        console.log("peso: " + peso);
    }

    async function editarPessoa(cpf: string) {
        axios
            .get(`http://localhost:8017/api/buscarCpf/${cpf}`)
            .then(async (resposta) => {
                let pessoaBusca: Pessoa = resposta.data;
                setNome(pessoaBusca.nome);
                setCpf(pessoaBusca.cpf);
                setSexo(pessoaBusca.sexo);
                setdataNasc(pessoaBusca.dataNasc.toString());
                setAltura(pessoaBusca.altura);
                setPeso(pessoaBusca.peso);
            })
            .catch((erro) => console.log(erro));
    }

    async function enviarFormulário() {
        let nascimento = new Date(dataNasc);
        const pessoa: Pessoa = new Pessoa(
            nome,
            nascimento,
            cpf,
            sexo,
            altura,
            peso
        );
        const api = axios.create({
            baseURL: "http://localhost:8017",
            timeout: 10000,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, GET",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Max-Age": "60000",
            },
        });
        api.post("/api/incluir", pessoa)
        .then(async (resposta) => {
            alert("POST: Sucesso!");
            listarPessoas();
        })
        .catch((erro) => {
            alert("POST: Erro: " + erro.message);
        });
        console.log("Pessoa: " + pessoa);
    }

  return (
      <div className="App container bg-light shadow rounded py-4 mt-2">
          {/*TÍTULO*/}
          <h1 className="Titulo text-center text-success">PESO IDEAL</h1>
          <div className="text-center pb-5 mb-5">
              <small>Prova de Recrutamento e Seleção – Athenas</small>
          </div>
          <form
              id="form-pessoa"
              action="#"
              onSubmit={(e) => {
                  e.preventDefault();
                  enviarFormulário();
              }}
              className="container px-5 pb-5"
              method="post"
          >
              {/*FORMULÁRIO*/}
              <div className="row mb-1 text-start">
                  <div className="col-6">
                      <div className="mb-3">
                          <label className="form-label ms-1">
                              Nome Completo
                          </label>
                          <input
                              type="text"
                              name="nome"
                              id="nome"
                              className="w-100"
                              onChange={(e) => {
                                  setNome((e.target as HTMLInputElement).value);
                              }}
                              value={nome}
                              required
                          />
                      </div>
                      <div className="row mb-3">
                          <div className="col">
                              <label className="form-label ms-1">CPF</label>
                              <input
                                  type="number"
                                  maxLength={11}
                                  minLength={11}
                                  name="cpf"
                                  id="cpf"
                                  className="w-100"
                                  onChange={(e) => {
                                      setCpf(
                                          (e.target as HTMLInputElement).value
                                      );
                                  }}
                                  value={cpf}
                                  required
                              />
                          </div>
                          <div className="col">
                              <label className="form-label ms-1">
                                  Data de Nascimento
                              </label>
                              <input
                                  type="date"
                                  name="dataNasc"
                                  id="dataNasc"
                                  className="w-100"
                                  onChange={(e) => {
                                      setdataNasc(
                                          (e.target as HTMLInputElement).value
                                      );
                                  }}
                                  value={dataNasc}
                                  required
                              />
                          </div>
                      </div>
                      <div className="d-flex flex-row">
                          <div className="col mb-3 me-3">
                              <label className="ms-1">Altura</label>
                              <input
                                  type="number"
                                  name="altura"
                                  id="altura"
                                  className="w-100"
                                  onChange={(e) => {
                                      setAltura(
                                          (e.target as HTMLInputElement).value
                                      );
                                  }}
                                  value={altura}
                                  required
                              />
                          </div>
                          <div className="col mb-3 me-3">
                              <label className="ms-1">Peso</label>
                              <input
                                  type="number"
                                  name="peso"
                                  id="peso"
                                  className="w-100"
                                  onChange={(e) => {
                                      setPeso(
                                          (e.target as HTMLInputElement).value
                                      );
                                  }}
                                  value={peso}
                                  required
                              />
                          </div>
                          <div className="col mb-3">
                              <label className="ms-1">Sexo</label>
                              <div className="d-flex flex-row fs-5">
                                  <select
                                      id="sexo"
                                      className="form-select"
                                      defaultValue={"sexo-m"}
                                  >
                                      <option id="sexo-m" value="M">
                                          M
                                      </option>
                                      <option id="sexo-f" value="F">
                                          F
                                      </option>
                                  </select>
                              </div>
                          </div>
                      </div>
                      <div className="row mb-1 mt-1">
                          <div className="col my-1">
                              <input
                                  type="submit"
                                  className="btn btn-primary w-100"
                                  form="form-pessoa"
                                  value="SALVAR"
                              />
                          </div>
                          <div className="col my-1">
                              <button
                                  type="reset"
                                  className="btn btn-warning w-100"
                                  form="form-pessoa"
                                  onClick={limparFormulario}
                              >
                                  LIMPAR
                              </button>
                          </div>
                          <div className="col my-1">
                              <button
                                  type="button"
                                  className="btn btn-success w-100"
                                  form="form-pessoa"
                                  onClick={autoload}
                              >
                                  AUTOPREENCHER
                              </button>
                          </div>
                      </div>
                  </div>
                  <div className="col ms-5">
                      <label className="form-label">Registro de Pessoas:</label>
                      <div className="border border-dark opacity-50 rounded h-100 w-100 p-1">
                          <div className="input-group mb-1">
                              <button
                                  type="button"
                                  className="input-group-text btn btn-info"
                                  id="pesquisar"
                                  onClick={() => pesquisar(pesquisa)}
                              >
                                  PESQUISAR
                              </button>
                              <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Pesquise por Nome ou CPF"
                                  aria-describedby="pesquisar"
                                  onChange={(e) => {
                                      setPesquisa(
                                          (e.target as HTMLInputElement).value
                                      );
                                  }}
                                  value={pesquisa}
                              />
                              <button
                                  type="button"
                                  className="input-group-text btn btn-secondary"
                                  id="resetPesquisar"
                                  onClick={resetPesquisa}
                              >
                                  X
                              </button>
                          </div>

                          <ul className="d-flex flex-column justify-content-center">
                              {lista?.map((p, i) => {
                                  return (
                                      <li key={i}>
                                          <span
                                              className="btn badge bg-danger rounded px-1"
                                              onClick={() =>
                                                  deletarPessoas(p.cpf)
                                              }
                                          >
                                              X
                                          </span>

                                          <label className="px-2">
                                              <span className="btn btn-sm btn-outline-primary"
                                                onClick={() => editarPessoa(p.cpf)}
                                              >
                                                {p.nome}
                                              </span>
                                          </label>

                                          <span className="badge bg-primary">
                                              Peso Ideal: {p.pesoIdeal}
                                          </span>
                                      </li>
                                  );
                              })}
                          </ul>
                      </div>
                  </div>
              </div>
          </form>
      </div>
  );
}

export default App;
