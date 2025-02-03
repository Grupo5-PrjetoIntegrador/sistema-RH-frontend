import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { DNA } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";
import { buscar, calcularSalario } from "../../../services/Service";
import { AuthContext } from "../../../contexts/AuthContext";
import Funcionario from "../../../models/Funcionario";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

function SalarioFuncionario() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Obtém os dados do funcionário da URL
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null); // Estado para armazenar os dados do funcionário
  const [salario, setSalario] = useState<number | null>(null); // Estado para armazenar o salário
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
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
      if (error.toString().includes("403")) {
        handleLogout();
      }
      ToastAlerta("Erro ao buscar dados do funcionário.", "erro");
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
    }
  }, [token]);

  async function fetchSalario() {
    try {
      if (token === "") {
        ToastAlerta("Você precisa estar logado", "erro");
        navigate("/");
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
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "erro");
      navigate("/");
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
      <div className="relative w-1/4 h-3/5 bg-blue-100 p-16 rounded-md shadow-lg shadow-blue-950/30">
        <div className="flex flex-col w-full gap-3 justify-center items-center mb-10">
          <h2 className="text-3xl font-bold text-blue-950">
            Cálculo de Salário
          </h2>
          <hr className="w-full border-t border-blue-950/50" />
        </div>

        {funcionario && (
          <div className="mt-4 flex flex-col gap-2">
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Nome:</span> {funcionario.nome}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Cargo: </span>
              {funcionario.cargo}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Setor: </span>{" "}
              {funcionario.setor?.nomeSetor ?? "Não especificado"}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Salário Base:</span> R${" "}
              {funcionario.salarioBase}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Horas Trabalhadas:</span>{" "}
              {funcionario.horasTrabalhadas}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Bônus:</span> R${" "}
              {funcionario.bonus}
            </p>
            <p className="text-xl text-blue-950">
              <span className="font-semibold">Descontos:</span> R${" "}
              {funcionario.descontos}
            </p>
          </div>
        )}

        {salario !== null ? (
          <p className="text-xl text-blue-950 mt-4 font-medium items-center">
            Salário Calculado: R$ {salario.toFixed(2)}
          </p>
        ) : (
          <p className="text-xl text-red-500 mt-4">
            Não foi possível calcular o salário.
          </p>
        )}

        <div className="absolute bottom-4 left-4">
          <button
            onClick={() => navigate("/funcionarios")}
            className="p-3 bg-blue-950/75 text-blue-50 rounded-full hover:bg-blue-800 transition duration-300 shadow-md"
          >
            <ArrowUturnLeftIcon  aria-hidden="true" className="size-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalarioFuncionario;
