import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setor from "../../../models/Setor";
import Usuario from "../../../models/Usuario"; // Certifique-se de importar a model de Usuario
import Funcionario from "../../../models/Funcionario";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ThreeDots } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";

function FormFuncionarios() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]); // Novo estado para usuários
  const [setor, setSetor] = useState<Setor>({ id: 0, nomeSetor: "" });
  const [funcionario, setFuncionario] = useState<Funcionario>(
    {} as Funcionario
  );

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarFuncionarioPorId(id: string) {
    try {
      await buscar(`/funcionarios/${id}`, setFuncionario, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  async function buscarSetorPorId(id: string) {
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

  // async function buscarUsuarios() {
  //   try {
  //     await buscar("/usuarios/all", setUsuarios, {
  //       headers: { Authorization: token },
  //     });
  //   } catch (error: any) {
  //     if (error.toString().includes("403")) {
  //       handleLogout();
  //     }
  //   }
  // }

  async function buscarSetores() {
    try {
      await buscar("/setores/all", setSetores, {
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
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarSetores();
    //buscarUsuarios(); // Carregar os usuários

    if (id !== undefined) {
      buscarFuncionarioPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setFuncionario({
      ...funcionario,
      setor: setor,
    });
  }, [setor]);

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setFuncionario({
      ...funcionario,
      [e.target.name]: e.target.value,
      setor: setor,
      //usuario: usuario, // Adiciona o usuario automaticamente do contexto
    });
  }

  function retornar() {
    navigate("/funcionarios");
  }

  async function gerarNovoFuncionario(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/funcionarios/atualizar`, funcionario, setFuncionario, {
          headers: { Authorization: token },
        });

        ToastAlerta("Funcionário atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar o Funcionário", "erro");
        }
      }
    } else {
      try {
        await cadastrar(
          `/funcionarios/cadastrar`,
          funcionario,
          setFuncionario,
          {
            headers: { Authorization: token },
          }
        );

        ToastAlerta("Funcionário cadastrado com sucesso!", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar o Funcionário", "erro");
        }
      }
    }

    setIsLoading(false);
    retornar();
  }

  const carregandoSetor = setor.nomeSetor === "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-screen text-blue-950 bg-gradient-to-b from-blue-300 to-blue-50 py-5">
      <h1 className="text-4xl text-center my-8">
        {id !== undefined ? "Editar Funcionário" : "Cadastrar Funcionário"}
      </h1>

      <form
        className="w-full flex flex-col gap-4 items-center justify-center"
        onSubmit={gerarNovoFuncionario}
      >
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="nome" className="">Nome do funcionario</label>
          <input
            type="text"
            placeholder="Digite aqui o nome do funcionário"
            name="nome"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="cargo">Cargo</label>
          <input
            type="text"
            placeholder="Escreva aqui o cargo do funcionário"
            name="cargo"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.cargo}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="salarioBase">Salário Base</label>
          <input
            type="number"
            placeholder="Digite aqui o salário base"
            name="salarioBase"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.salarioBase}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="bonus">Bônus</label>
          <input
            type="number"
            placeholder="Digite aqui o bônus"
            name="bonus"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.bonus}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="descontos">Descontos</label>
          <input
            type="number"
            placeholder="Digite aqui o desconto"
            name="descontos"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.descontos}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="horasTrabalhadas">Horas Trabalhadas</label>
          <input
            type="number"
            placeholder="Digite aqui as horas trabalhadas"
            name="horasTrabalhadas"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.horasTrabalhadas}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <label htmlFor="aniversarioEmpresa">Aniversário da Empresa</label>
          <input
            type="date"
            name="aniversarioEmpresa"
            required
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={funcionario.aniversarioEmpresa || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        <div className="flex flex-col gap-1 w-3/6">
          <p>Setor</p>
          <select
            name="setor"
            id="setor"
            className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e) => buscarSetorPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled>
              Selecione um Setor
            </option>

            {setores.map((setor) => (
              <option value={setor.id} key={setor.id}>
                {setor.nomeSetor}
              </option>
            ))}
          </select>
        </div>

        {/* Novo campo para o usuário */}
        {/* <div className="flex flex-col gap-1 w-3/6">
          <p>Usuário</p>
          <select
            name="usuario"
            id="usuario"
            className="border p-2 border-blue-200 rounded"
            value={funcionario.usuario ? funcionario.usuario.id : ""}
            onChange={(e) => atualizarEstado(e)}
          >
            <option value="" selected disabled>
              Selecione um Usuário
            </option>

            {usuarios.map((usuario) => (
              <option value={usuario.id} key={usuario.id}>
                {usuario.nome}
              </option>
            ))}
          </select>
        </div> */}

        <button
          type="submit"
          className="w-1/3 rounded-lg bg-blue-500 text-white font-medium text-base py-3 px-6 mt-6 shadow-md hover:bg-blue-600 disabled:opacity-80 flex justify-center items-center"
          disabled={carregandoSetor}
        >
          {isLoading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="60"
              color="#33212B"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormFuncionarios;
