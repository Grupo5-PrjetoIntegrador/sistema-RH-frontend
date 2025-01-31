import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import CardFuncionarios from "../cardfuncionarios/CardFuncionarios";
import Funcionario from "../../../models/Funcionario";

function ListaFuncionarios() {

    const navigate = useNavigate();

    const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarFuncionario() {
        try {
            await buscar('/funcionarios', setFuncionarios, {
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/');
        }
    }, [token])

    useEffect(() => {
        buscarFuncionario()
    }, [funcionarios.length])

    return (
        <>
            {funcionarios.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
            >
                {funcionarios.map((funcionario) => (
                    <CardFuncionarios key={funcionario.id} funcionario={funcionario} />
                ))}

            </div>
        </>
    );
}

export default ListaFuncionarios;