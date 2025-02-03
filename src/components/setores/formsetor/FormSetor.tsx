import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines, ThreeDots } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Setor from "../../../models/Setor";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormSetor() {
  const navigate = useNavigate();

  const [setor, setSetor] = useState<Setor>({} as Setor);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const { id } = useParams<{ id: string }>();

  async function buscarPorId(id: string) {
    try {
      await buscar(`/setores/${id}`, setSetor, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      alert("Você precisa estar logado!");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setSetor({
      ...setor,
      [e.target.name]: e.target.value,
    });
  }

  function retornar() {
    navigate("/setores");
  }

  async function gerarNovoSetor(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/setores/atualizar`, setor, setSetor, {
          headers: { Authorization: token },
        });
        alert("O setor foi atualizado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar o setor.");
        }
      }
    } else {
      try {
        await cadastrar(`/setores/cadastrar`, setor, setSetor, {
          headers: { Authorization: token },
        });
        alert("O setor foi cadastrado com sucesso!");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar o setor.");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  return (
    <div className="flex flex-col items-center justify-start h-screen text-blue-950 bg-gradient-to-b from-blue-300 to-blue-50 py-5">
      <h1 className="text-4xl text-center my-8">
        {id === undefined ? "Cadastrar Setor" : "Editar Setor"}
      </h1>

      <form
        className="w-1/2 flex flex-col gap-8 items-center justify-center "
        onSubmit={gerarNovoSetor}
      >
        <div className="flex flex-col gap-2 w-full">
          <label htmlFor="descricao">Descrição do Setor</label>
          <input
            type="text"
            placeholder="Digite o nome do setor"
            name="nomeSetor"
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={setor.nomeSetor}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <button
          className="w-1/3 rounded-lg bg-blue-500 text-white font-medium text-base py-3 px-6 shadow-md hover:bg-blue-600 disabled:opacity-80 flex justify-center items-center"
          type="submit"
        >
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="60"
              color="#1E3A8A"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span className="font-semibold">
              {id === undefined ? "Cadastrar" : "Atualizar"}
            </span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormSetor;
