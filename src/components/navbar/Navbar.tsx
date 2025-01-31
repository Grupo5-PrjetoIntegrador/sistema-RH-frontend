import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {

    const navigate = useNavigate();

    const { handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('Desconectado com sucesso! Até mais!')
        navigate('/login')
    }
    
    return (
        <>
            <div className='w-full bg-indigo-900 text-white
                flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <Link to='/home' className="text-2xl font-bold">Gen RH</Link>

                    <div className='flex gap-4'>
                        <Link to='/funcionarios' className='hover:underline'>Funcionários</Link>
                        <Link to='/setores' className='hover:underline'>Setores</Link>
                        <Link to='/cadastrarsetor' className='hover:underline'>Cadastrar Setor</Link>
                        <Link to='/perfil' className='hover:underline'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:text-red-600'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;