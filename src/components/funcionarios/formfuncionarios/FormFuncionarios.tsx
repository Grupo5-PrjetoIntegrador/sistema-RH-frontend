import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setor from "../../../models/Setor";
import Usuario from "../../../models/Usuario";  // Certifique-se de importar a model de Usuario
import Funcionario from "../../../models/Funcionario";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ThreeDots } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";

function FormFuncionarios() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [setores, setSetores] = useState<Setor[]>([]);
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);  // Novo estado para usuários
    const [setor, setSetor] = useState<Setor>({ id: 0, nomeSetor: '' });
    const [funcionario, setFuncionario] = useState<Funcionario>({} as Funcionario);

    const { id } = useParams<{ id: string }>();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarFuncionarioPorId(id: string) {
        try {
            await buscar(`/funcionarios/${id}`, setFuncionario, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarSetorPorId(id: string) {
        try {
            await buscar(`/setores/${id}`, setSetor, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarUsuarios() {
        try {
            await buscar('/usuarios/all', setUsuarios, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarSetores() {
        try {
            await buscar('/setores/all', setSetores, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarSetores();
        buscarUsuarios();  // Carregar os usuários

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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setFuncionario({
            ...funcionario,
            [e.target.name]: e.target.value,
            setor: setor,
            usuario: usuario,  // Adiciona o usuario automaticamente do contexto
        });
    }

    function retornar() {
        navigate('/funcionarios');
    }

    async function gerarNovoFuncionario(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/funcionarios`, funcionario, setFuncionario, {
                    headers: { Authorization: token },
                });

                ToastAlerta('Funcionário atualizado com sucesso', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Funcionário', 'erro');
                }
            }
        } else {
            try {
                await cadastrar(`/funcionarios/cadastrar`, funcionario, setFuncionario, {
                    headers: { Authorization: token },
                });

                ToastAlerta('Funcionário cadastrado com sucesso!', 'sucesso');
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o Funcionário', 'erro');
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoSetor = setor.nomeSetor === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Funcionário' : 'Cadastrar Funcionário'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoFuncionario}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="nome">Nome do funcionario</label>
                    <input 
                        type="text"
                        placeholder="Digite aqui o nome do funcionário"
                        name="nome"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.nome}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="cargo">Cargo</label>
                    <input 
                        type="text"
                        placeholder="Escreva aqui o cargo do funcionário"
                        name="cargo"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.cargo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="salarioBase">Salário Base</label>
                    <input 
                        type="number"
                        placeholder="Digite aqui o salário base"
                        name="salarioBase"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.salarioBase}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="bonus">Bônus</label>
                    <input 
                        type="number"
                        placeholder="Digite aqui o bônus"
                        name="bonus"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.bonus}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="descontos">Descontos</label>
                    <input 
                        type="number"
                        placeholder="Digite aqui o desconto"
                        name="descontos"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.descontos}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="horasTrabalhadas">Horas Trabalhadas</label>
                    <input 
                        type="number"
                        placeholder="Digite aqui as horas trabalhadas"
                        name="horasTrabalhadas"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.horasTrabalhadas}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="aniversarioEmpresa">Aniversário da Empresa</label>
                    <input 
                        type="date"
                        name="aniversarioEmpresa"
                        required
                        className="border-2 border-blue-400 rounded p-2"
                        value={funcionario.aniversarioEmpresa || ""}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Setor</p>
                    <select 
                        name="setor" 
                        id="setor" 
                        className="border p-2 border-lit-eggplant-purple rounded"
                        onChange={(e) => buscarSetorPorId(e.currentTarget.value)}>

                        <option value="" selected disabled>Selecione um Setor</option>
                        
                        {setores.map((setor) => (
                            <option value={setor.id} key={setor.id}>{setor.nomeSetor}</option>
                        ))}
                    </select>
                </div>

                {/* Novo campo para o usuário */}
                <div className="flex flex-col gap-2">
                    <p>Usuário</p>
                    <select 
                        name="usuario" 
                        id="usuario" 
                        className="border p-2 border-lit-eggplant-purple rounded"
                        value={funcionario.usuario ? funcionario.usuario.id : ''}
                        onChange={(e) => atualizarEstado(e)}>

                        <option value="" disabled>Selecione um Usuário</option>
                        
                        {usuarios.map((usuario) => (
                            <option value={usuario.id} key={usuario.id}>
                                {usuario.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button 
                    type="submit" 
                    className="rounded disabled:bg-blue-400 bg-blue-600 hover:bg-blue-700 text-blue-50 font-bold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={carregandoSetor}>
                        {isLoading ? <ThreeDots
                            visible={true}
                            height="25"
                            width="60"
                            color="#33212B"
                            radius="9"
                            ariaLabel="three-dots-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                        /> : 
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>}
                </button>
            </form>
        </div>
    );
}

export default FormFuncionarios;
