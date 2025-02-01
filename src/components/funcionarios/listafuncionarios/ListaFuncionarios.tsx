import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import CardFuncionarios from "../cardfuncionarios/CardFuncionarios";
import Funcionario from "../../../models/Funcionario";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

function ListaFuncionarios() {
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
    const [paginaAtual, setPaginaAtual] = useState(0);
    const [direcao, setDirecao] = useState(1); // 1 = Próximo (entra pela direita), -1 = Anterior (entra pela esquerda)

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const itensPorPagina = 5;
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
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        buscarFuncionario();
    }, [funcionarios.length]);

    // Obtém os funcionários da página atual
    const funcionariosPaginados = funcionarios.slice(
        paginaAtual * itensPorPagina,
        (paginaAtual + 1) * itensPorPagina
    );

    // Função para ir para a próxima página
    const proximaPagina = () => {
        if (paginaAtual < totalPaginas - 1) {
            setDirecao(1); // Próximo -> entra pela direita
            setPaginaAtual((prev) => prev + 1);
        }
    };

    // Função para ir para a página anterior
    const paginaAnterior = () => {
        if (paginaAtual > 0) {
            setDirecao(-1); // Entra pela esquerda
            setPaginaAtual((prev) => prev - 1);
        }
    };

    return (
        <>
        <div className="flex flex-col items-center w-full h-screen justify-between relative">
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

            {/* Contêiner fixo para evitar mudanças de tamanho */}
            <div className="overflow-hidden w-full relative flex-grow">
                <AnimatePresence mode="wait" custom={direcao}>
                    <motion.ul
                        key={paginaAtual}
                        role="list"
                        className="divide-y divide-blue-950/30 w-full h-full flex flex-col items-center"
                        initial={{
                            x: direcao === 1 ? "100%" : "-100%", // Inicia fora da tela (direita ou esquerda)
                            opacity: 0,
                        }}
                        animate={{
                            x: "0%", // Move para a posição final (0%)
                            opacity: 1,
                        }}
                        exit={{
                            x: direcao === 1 ? "-100%" : "100%", // Sai da tela para a direção oposta
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6, // Tempo de transição mais suave
                            ease: "easeInOut", // Suaviza a animação
                        }}
                    >
                        {funcionariosPaginados.map((funcionario) => (
                            <CardFuncionarios key={funcionario.id} funcionario={funcionario} />
                        ))}
                    </motion.ul>
                </AnimatePresence>
            </div>

            {/* Botões de navegação fixos no final do conteúdo */}
            {totalPaginas > 1 && (
                <div className="sticky bottom-0 w-full bg-blue-100 z-10 py-4">
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={paginaAnterior}
                            className="px-4 py-2 bg-blue-900 text-blue-50 rounded-full shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={paginaAtual === 0}
                        >
                           <ArrowLeftIcon aria-hidden="true" className="size-8"/>
                        </button>
                        <span className="text-lg font-semibold">{paginaAtual + 1} / {totalPaginas}</span>
                        <button
                            onClick={proximaPagina}
                            className="px-4 py-2 bg-blue-900 text-blue-50 rounded-full shadow-md hover:bg-blue-700 transition disabled:opacity-50"
                            disabled={paginaAtual === totalPaginas - 1}
                        >
                            <ArrowRightIcon aria-hidden="true" className="size-8"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
        </>
    );
}

export default ListaFuncionarios;
