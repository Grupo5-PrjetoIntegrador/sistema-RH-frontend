import { ReactNode, useContext } from "react";
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext";
import Menu from "../menu/Menu";

function Navbar() {

    const navigate = useNavigate();

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        alert('Desconectado com sucesso! Até mais!')
        navigate('/login')
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className='w-full bg-gradient-to-l from-blue-900 to-blue-700 text-blue-50 flex justify-between items-center py-4'>

                <div className="w-full flex justify-between items-center mx-16 text-xl">
                    <div className="flex justify-center items-center gap-4">
                        
                        <Link to='/home'>
                            <img src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/logo03.svg?updatedAt=1738427828575" alt="Logo Build Minds RH" className="size-10" />
                        </Link>
                    </div>

                    <div className='flex gap-4'>
                        <Menu />
                        <Link to='' onClick={logout} className='hover:text-red-600'>Sair</Link>
                    </div>
                </div>
            </div>
        )
    } 
    
    return (
        <>
            {component}
        </>
    )
}

export default Navbar;