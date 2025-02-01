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
            <div className='w-full bg-blue-950 text-blue-50 flex justify-center py-4'>

                <div className="container flex justify-between text-lg">
                    <div className="flex justify-center items-center gap-4">
                        <img src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/logo03.svg?updatedAt=1738427828575" alt="Logo Build Minds RH" className="size-8" />
                        <Link to='/home' className="text-2xl font-bold">Build Minds RH</Link>
                    </div>

                    <div className='flex gap-4'>
                        <Link to='/funcionarios' className='hover:text-cor-destaque'>Funcionários</Link>
                        <Link to='/setores' className='hover:text-cor-destaque'>Setores</Link>
                        <Link to='/cadastrarsetor' className='hover:text-cor-destaque'>Cadastrar Setor</Link>
                        <Link to='/perfil' className='hover:text-cor-destaque'>Perfil</Link>
                        <Link to='' onClick={logout} className='hover:text-red-600'>Sair</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;