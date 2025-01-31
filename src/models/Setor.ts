import Funcionario from "./Funcionario";

export default interface Setor {
    id: number;
    nomeSetor: string;
    funcionario?: Funcionario | null;
}