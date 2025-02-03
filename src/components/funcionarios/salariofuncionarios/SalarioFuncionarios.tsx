import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";
import { buscar, calcularSalario } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import Funcionario from "../../../models/Funcionario";

function SalarioFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();  // Obtém os dados do funcionário da URL
    const [funcionario, setFuncionario] = useState<Funcionario | null>(null);  // Estado para armazenar os dados do funcionário
    const [salario, setSalario] = useState<number | null>(null);  // Estado para armazenar o salário
    const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;


    async function buscarFuncionario() {
        try {
             await buscar(`/funcionarios/${id}`, setFuncionario, {
                headers: {
                    Authorization: token,
                },
            }); 
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
            ToastAlerta("Erro ao buscar dados do funcionário.", "erro");
        }
    }
    
    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "erro");
            navigate('/');
        }
    }, [token]);

    
    async function fetchSalario() {
        try {
            if (token === '') {
                ToastAlerta("Você precisa estar logado", "erro");
                navigate('/');
                return;
            }
    
            await calcularSalario(`/funcionarios/${id}/salario`, setSalario, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error) {
            ToastAlerta("Erro ao calcular salário.", "erro");
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "erro");
            navigate('/');
        } else {
            buscarFuncionario(); 
            fetchSalario();       
        }
    }, [id, token, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-blue-300 to-blue-50">
            <h2 className="text-3xl font-bold text-blue-950">Cálculo de Salário</h2>

            {funcionario && (
                <div className="mt-4">
                    <p className="text-xl text-blue-900">Nome: {funcionario.nome}</p>
                    <p className="text-xl text-blue-900">Cargo: {funcionario.cargo}</p>
                    <p className="text-xl text-blue-900">Setor: {funcionario.setor?.nomeSetor ?? "Não especificado"}</p>
                    <p className="text-xl text-blue-900">Salário Base: R$ {funcionario.salarioBase}</p>
                    <p className="text-xl text-blue-900">Horas Trabalhadas: {funcionario.horasTrabalhadas}</p>
                    <p className="text-xl text-blue-900">Bônus: R$ {funcionario.bonus}</p>
                    <p className="text-xl text-blue-900">Descontos: R$ {funcionario.descontos}</p>
                </div>
            )}

            {salario !== null ? (
                <p className="text-xl text-blue-900 mt-4">Salário Calculado: R$ {salario.toFixed(2)}</p>
            ) : (
                <p className="text-xl text-red-500 mt-4">Não foi possível calcular o salário.</p>
            )}

            <button
                onClick={() => navigate('/funcionarios')}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
            >
                Voltar para Funcionários
            </button>
        </div>
    );
}

export default SalarioFuncionario;
