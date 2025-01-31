import Funcionario from "./Funcionario";

export default interface Usuario {
    id: number;
    nome: string;
    usuario: string;
    foto: string;
    senha: string;
    funcionario?: Funcionario | null;
}