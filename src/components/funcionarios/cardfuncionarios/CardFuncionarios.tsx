import { Link } from 'react-router-dom'
import Funcionario from '../../../models/Funcionario'
import { LegoSmiley } from '@phosphor-icons/react';
import { CurrencyDollarIcon, PencilIcon, UserMinusIcon } from '@heroicons/react/24/outline';

interface CardFuncionariosProps {
    funcionario: Funcionario
}

function CardFuncionarios({ funcionario }: CardFuncionariosProps) {
    return (
        <>

<li key={funcionario.cargo} className="flex justify-between gap-x-6 p-5 w-1/2">
                <div className="flex min-w-0 gap-x-4 w-9/12 justify-center items-center">
                    <span className="size-12 flex rounded-full bg-white justify-center items-center">
                        <LegoSmiley size={32} />
                    </span>
                    <div className="min-w-0 flex-auto">
                        <p className="text-xl/6 font-semibold text-slate-900">{funcionario.nome}</p>
                        <p className="mt-1 truncate text-sm/5 text-slate-600">{funcionario.cargo}</p>
                    </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center items-center">
                    <p className="text-lg/6 font-semibold text-slate-900">{funcionario.setor?.nomeSetor}</p>
                    <p className="text-sm/6 text-slate-900">
                        Na empresa desde:{' '}
                        {new Intl.DateTimeFormat(undefined, {
                            dateStyle: 'medium',
                        }).format(new Date(funcionario.aniversarioEmpresa))}
                    </p>
                </div>
                <div className="flex flex-col w-1/12 h-full gap-2">
                    <Link to={`/editarfuncionario/${funcionario.id}`} className="flex items-center justify-center h-1/2">
                        <button className="w-12 h-12 rounded-full text-blue-800 bg-blue-400 hover:bg-blue-600 hover:text-blue-50 flex items-center justify-center">
                            <PencilIcon aria-hidden="true" className="size-7" />
                        </button>
                    </Link>
                    <Link to={`/deletarpostagem/${funcionario.id}`} className="flex items-center justify-center h-1/2">
                        <button className="w-12 h-12 rounded-full bg-red-400 text-red-800 hover:bg-red-600 hover:text-red-50 flex items-center justify-center">
                            <UserMinusIcon aria-hidden="true" className="size-7" />
                        </button>
                    </Link>
                    <Link to={`/funcionarios/${funcionario.id}/salario`} className="flex items-center justify-center h-1/2">
                        <button className="w-12 h-12 rounded-full bg-green-400 text-green-800 hover:bg-green-600 hover:text-green-50 flex items-center justify-center">
                            <CurrencyDollarIcon aria-hidden="true" className="size-7" />
                        </button>
                    </Link>
                </div>
            </li>
            
            <div className='border-slate-900 border 
            flex flex-col rounded overflow-hidden justify-between'>

            {/* <div>
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
                    <p>{funcionario.cargo}</p>
                    <p>Setor: {funcionario.setor?.nomeSetor}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(funcionario.aniversarioEmpresa))}</p>
                </div>
            </div> */}
            
        </div>
        </>
        
    )
}

export default CardFuncionarios;