import Setor from './Setor';
import Usuario from './Usuario';

export default interface Funcionario {
    titulo: ReactNode;
    texto: ReactNode;
    tema: any;
    data: string | number | Date;
    id: number;
    nome: string;
    cargo: string;
    salarioBase: number;
    horasTrabalhadas: number;
    bonus: number;
    descontos: number;
    aniversarioEmpresa: string;
    setor: Setor | null;
    usuario: Usuario | null;
}