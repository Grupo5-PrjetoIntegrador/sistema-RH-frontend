import { Link } from 'react-router-dom'
import Funcionario from '../../../models/Funcionario'

interface CardFuncionariosProps {
    funcionario: Funcionario
}

function CardFuncionario({ funcionario }: CardFuncionariosProps) {
    return (
        <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>

            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img
                        src={funcionario.usuario?.foto}
                        className='h-12 rounded-full'
                        alt={funcionario.usuario?.nome} />
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {funcionario.usuario?.nome}
                    </h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{funcionario.nome}</h4>
                    <p>{funcionario.texto}</p>
                    <p>Tema: {funcionario.tema?.nomeSetor}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(funcionario.data))}</p>
                </div>
            </div>
            <div className="flex">
                <Link to=''
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${funcionario.id}`}
                    className='text-white bg-red-400 
                	hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardFuncionario