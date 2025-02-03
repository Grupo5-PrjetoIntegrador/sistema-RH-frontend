import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";
import { calcularSalario } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";

function SalarioFuncionario() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();  // Obtém o ID do funcionário da URL
    const [salario, setSalario] = useState<number | null>(null);  // Estado para armazenar o salário
    const [loading, setLoading] = useState(true);  // Estado para controlar o carregamento
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    useEffect(() => {
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
    
        fetchSalario();
    }, [id, token, navigate]);

    // Exibe o loading enquanto a requisição está sendo feita
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <DNA visible={true} height="200" width="200" ariaLabel="dna-loading" />
            </div>
        );
    }

    // Exibe o salário calculado ou mensagem de erro
    return (
        <div className="flex flex-col items-center h-screen justify-center bg-blue-50">
            <h2 className="text-3xl font-bold text-blue-950">Cálculo de Salário</h2>
            {salario !== null ? (
                <p className="text-xl text-blue-900 mt-4">Salário: R$ {salario.toFixed(2)}</p>
            ) : (
                <p className="text-xl text-red-500 mt-4">Não foi possível calcular o salário.</p>
            )}
        </div>
    );
}

export default SalarioFuncionario;
