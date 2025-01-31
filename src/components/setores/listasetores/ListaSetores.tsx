import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Setor from "../../../models/Setor";
import CardSetores from "../cardsetores/CardSetores";
import { buscar } from "../../../services/Service";

function ListaSetores() {

    const navigate = useNavigate();

    const [setores, setSetores] = useState<Setor[]>([])

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarSetores() {
        try {
            await buscar('/setores', setSetores, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        buscarSetores()    
    }, [setores.length])
    
    return (
        <>
        {setores.length === 0 && (
            <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
        />
        )}
            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       {setores.map((setores) => (
                            <CardSetores key={setores.id} setor={setores} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ListaSetores;