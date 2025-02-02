import { GithubLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'

function Footer() {

    let data = new Date().getFullYear();

    const {usuario} = useContext(AuthContext);

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="flex justify-between items-center bg-gradient-to-r from-blue-950 to-blue-700 text-blue-50 py-2">
                <div className='w-1/3 flex gap-2 items-center justify-center py-4'>
                <p className='text-lg'>Veja mais projetos:</p>
                <a href="https://github.com/Grupo5-PrjetoIntegrador" target="_blank" rel="noopener noreferrer" className="hover:text-cor-destaque">
                <GithubLogo size={34} weight="bold" /></a>
                    
                    <p> e conheca os <span className='text-cor-destaque'>Desenvolvedores</span></p>
                </div>
                <div className="container flex  flex-col items-center w-1/6">
                    <p className='text-xl font-semibold'>Build Minds RH &#169; {data}</p>
                   
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

export default Footer