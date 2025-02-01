import { Link } from 'react-router-dom';
import Setor from '../../../models/Setor';
import { HomeModernIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface CardSetoresProps {
    setor: Setor;
}

function CardSetores({ setor }: CardSetoresProps) {
    return (
        <li key={setor.id} className="flex justify-between gap-x-6 p-5 w-1/2">
            <div className="flex min-w-0 gap-x-4 w-9/12 justify-center items-center">
                <span className="size-12 flex rounded-full bg-white justify-center items-center">
                    <HomeModernIcon aria-hidden="true" className='size-7' />
                </span>
                <div className="min-w-0 flex-auto">
                    <p className="text-xl/6 font-semibold text-slate-900">{setor.nomeSetor}</p>
                    <p className="mt-1 truncate text-sm/5 text-slate-600">Setor</p>
                </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end justify-center items-center">
                {/* Exemplo de informação adicional */}
            </div>
            <div className="flex flex-col w-1/12 h-full gap-2">
                <Link to={`/editarsetor/${setor.id}`} className="flex items-center justify-center h-1/2">
                    <button className="w-12 h-12 rounded-full text-blue-800 bg-blue-100 hover:bg-blue-500 hover:text-blue-50 flex items-center justify-center">
                        <PencilIcon aria-hidden="true" className='size-7'/>
                    </button>
                </Link>
                <Link to={`/deletarsetor/${setor.id}`} className="flex items-center justify-center h-1/2">
                    <button className="w-12 h-12 rounded-full bg-red-200 text-red-800 hover:bg-red-500 hover:text-red-50 flex items-center justify-center">
                        <XMarkIcon aria-hidden="true" className='size-7' />
                    </button>
                </Link>
            </div>
        </li>
    );
}

export default CardSetores;
