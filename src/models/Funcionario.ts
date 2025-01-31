import { ReactNode } from 'react';
import Setor from './Setor';
import Usuario from './Usuario';

export default interface Funcionario {
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