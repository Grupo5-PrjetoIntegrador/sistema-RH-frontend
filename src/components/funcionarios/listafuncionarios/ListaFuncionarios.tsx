import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { ToastAlerta } from "../../../utils/ToastAlert";
import Funcionario from "../../../models/Funcionario";

function ListaFuncionarios() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [direcao, setDirecao] = useState(1);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const itensPorPagina = 4;
    const totalPaginas = Math.ceil(funcionarios.length / itensPorPagina);

    async function buscarFuncionario() {
        try {
            await buscar('/funcionarios/all', setFuncionarios, {
                headers: {
                    Authorization: token,
                },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta("Você precisa estar logado", "erro")
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarFuncionario();
    }, [funcionarios.length]);

    const funcionariosPaginados = funcionarios.slice(
        paginaAtual * itensPorPagina,
        (paginaAtual + 1) * itensPorPagina
    );

    const proximaPagina = () => {
        if (paginaAtual < totalPaginas - 1) {
            setDirecao(1);
            setPaginaAtual((prev) => prev + 1);
        }
    };

    const paginaAnterior = () => {
        if (paginaAtual > 0) {
            setDirecao(-1);
            setPaginaAtual((prev) => prev - 1);
        }
    };

    return (
        <div className="flex flex-col items-center w-full h-screen justify-between relative bg-gradient-to-b from-blue-300 to-blue-50">
            <h2 className="font-semibold text-3xl text-blue-950 py-6">Funcionários:</h2>

            {funcionarios.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            <div className="overflow-hidden w-full relative flex-grow">
                <AnimatePresence mode="wait" custom={direcao}>
                    <motion.ul
                        key={paginaAtual}
                        role="list"
                        className="divide-y divide-blue-950/30 w-full h-full flex flex-col items-center"
                        initial={{
                            x: direcao === 1 ? "100%" : "-100%",  // Direção da animação de transição
                            opacity: 0,
                        }}
                        animate={{
                            x: "0%",  // Animação de entrada da lista
                            opacity: 1,
                        }}
                        exit={{
                            x: direcao === 1 ? "-100%" : "100%",  // Animação de saída da lista
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >
                        {funcionariosPaginados.map((funcionario) => (
                            <li key={funcionario.id} className="w-full p-4">
                                <div className="flex justify-between items-center">
                                    {/* Exibindo apenas o nome do funcionário */}
                                    <span>{funcionario.nome}</span>

                                    {/* Adicionando o botão de "Calcular Salário" para cada funcionário */}
                                    <button
                                        onClick={() => navigate(`/${funcionario.id}/salario`)}  // Navega para a página de cálculo de salário com o ID do funcionário
                                        className="px-4 py-2 bg-blue-900 text-blue-50 rounded-full shadow-md hover:bg-blue-700 transition"
                                    >
                                        Calcular Salário
                                    </button>
                                </div>
                            </li>
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </div>

            {totalPaginas > 1 && (
                <div className="sticky bottom-0 w-full bg-blue-300 z-10 py-3">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={paginaAnterior}
                            className="px-2 py-2 bg-blue-900 text-blue-50 rounded-full shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={paginaAtual === 0}
                        >
                           <ArrowLeftIcon aria-hidden="true" className="size-8 hover:text-cor-destaque"/>
                        </button>
                        <span className="text-lg font-semibold">{paginaAtual + 1} / {totalPaginas}</span>
                        <button
                            onClick={proximaPagina}
                            className="px-2 py-2 bg-blue-900 text-blue-50 rounded-full shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={paginaAtual === totalPaginas - 1}
                        >
                            <ArrowRightIcon aria-hidden="true" className="size-8 hover:text-cor-destaque"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ListaFuncionarios;
