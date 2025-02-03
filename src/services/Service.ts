/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080/'
});

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    // Desestruturando para remover a chave "id" e espalhar o restante
    const { id, ...dadosSemId } = dados as { [key: string]: any }; 
    
    // Enviando a requisição com o objeto sem o campo "id"
    const resposta = await api.post(url, dadosSemId);
    setDados(resposta.data);
};


export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    console.log(dados)
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}

export const calcularSalario = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header);
    setDados(resposta.data);  
};
