import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setor from "../../../models/Setor";
import Funcionario from "../../../models/Funcionario";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ThreeDots } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlert";

function FormFuncionarios() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [setores, setSetores] = useState<Setor[]>([]);

    
    const [setor, setSetor] = useState<Setor>({id: 0, nomeSetor: '', });
    const [funcionario, setFuncionario] = useState<Funcionario>({} as Funcionario);

    const { id } = useParams<{id: string}>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarFuncionarioPorId(id: string) {
        try {
            await buscar(`/funcionarios/${id}`, setFuncionario, {
                headers: { Authorization: token }
            })
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
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarSetores() {
        try {
            await buscar('/setores', setSetores, {
                headers: { Authorization: token }
            })
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setFuncionario({
            ...funcionario,
            [e.target.name]: e.target.value,
            setor: setor,
            usuario: usuario,
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
                    headers: { Authorization: token, },
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
                await cadastrar(`/funcionarios`, funcionario, setFuncionario, {
                    headers: { Authorization: token, },
                })

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
                    placeholder="Escreva aqui o nome do funcionário"
                    name="nome"
                    required
                    className="border-2 border-rose-quartz rounded p-2"
                    value={funcionario.nome}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="cargo">Cargo</label>
                    <input 
                        type="text"
                        placeholder="Escrava aqui o cargo do funcionário"
                        name="cargo"
                        required
                        className="border-2 border-rose-quartz rounded p-2"
                        value={funcionario.cargo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Setor</p>
                    <select name="setor" id="setor" className="border p-2 border-lit-eggplant-purple rounded"
                        onChange={(e) => buscarSetorPorId(e.currentTarget.value)}>

                        <option value="" selected disabled>Selecione um Setor</option>
                        
                        {setores.map((setor) => (
                            <>
                                <option value={setor.id}>{setor.nomeSetor}</option>
                            </>
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
                                      <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>
                                    }
                    </button>
            </form>
        </div>
    );
}

export default FormFuncionarios;