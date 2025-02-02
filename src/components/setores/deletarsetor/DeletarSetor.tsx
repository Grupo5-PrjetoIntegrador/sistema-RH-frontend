import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Setor from "../../../models/Setor"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { CheckIcon, HomeModernIcon, XMarkIcon } from "@heroicons/react/24/outline"

function DeletarSetor() {

    const navigate = useNavigate()

    const [setor, setSetor] = useState<Setor>({} as Setor)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/setores/${id}`, setSetor, {
                headers: {
                    'Authorization': token
                }
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
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarSetor() {
        setIsLoading(true)

        try {
            await deletar(`/setores/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            alert('Setor apagado com sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                alert('Erro ao deletar o setor.')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/setores")
    }
    
    return (
        <div className='container w-1/3 mx-auto text-blue-950'>
            <h1 className='text-4xl text-center py-8 font-semibold'>Deletar setor</h1>
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o setor a seguir?</p>
            <div className='flex min-w-0 gap-x-4 w-full justify-center items-center py-6 px-6 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50'>
            <span className="size-12 flex rounded-full bg-white justify-center items-center ml-3">
                    <HomeModernIcon aria-hidden="true" className='size-7' />
                </span>
                <div className="min-w-0 flex-auto h-full">
                    <p className="text-xl/6 font-semibold text-slate-900">{setor.nomeSetor}</p>
                    <hr className='w-full h-1 border-t-2 border-blue-950/30 my-2' />
                    <p className="mt-1 truncate text-sm/5 text-slate-600">Setor</p>
                </div>
                <div className="flex flex-col w-1/12 h-full gap-2 mr-3">
                    <button 
                        className='w-12 h-12 rounded-full bg-red-400 text-red-800 hover:bg-red-600 hover:text-red-50 flex items-center justify-center'
                        onClick={retornar}>
                        <XMarkIcon aria-hidden="true" className='size-7' />
                    </button>
                    <button 
                        className='w-12 h-12 rounded-full text-green-800 bg-green-400 hover:bg-green-600 hover:text-green-50 flex items-center justify-center'
                                   onClick={deletarSetor}>
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>
                                <CheckIcon aria-hidden="true" className='size-7'/>
                            </span>
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}
export default DeletarSetor