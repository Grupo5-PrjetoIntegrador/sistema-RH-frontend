import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Setor from "../../../models/Setor";
import Funcionario from "../../../models/Funcionario";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";

function FormFuncionarios() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [setor, setSetor] = useState<Setor[]>([]);

    
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
            await buscar('/setores', setSetor, {
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
        <div className=" flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-blue-300 to-blue-50">
            <h1 className="text-4xl text-center my-8 font-semibold text-blue-950">Cadastrar funcionário</h1>

            <form className="flex flex-col w-1/2 gap-8 items-center justify-center">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="titulo">Nome</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="titulo">Cargo</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p>Setor</p>
                    <select name="setor" id="setor" className='w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300' >
                        <option value="" selected disabled>Selecione o setor</option>
                        
                        <>
                            <option>setor1</option>
                        </>

                    </select>
                </div>
                <button type='submit' className='w-1/3 rounded-lg bg-blue-500 text-white font-medium text-base py-3 px-6 shadow-md hover:bg-blue-600 disabled:opacity-80 flex justify-center items-center'
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default FormFuncionarios;