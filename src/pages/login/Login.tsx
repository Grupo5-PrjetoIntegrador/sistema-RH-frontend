import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { RotatingLines } from "react-loader-spinner";

function Login() {

    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
        {} as UsuarioLogin
    )


    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })
    }

    function Login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)
    }

    return (
        <>
            <main className="flex flex-row items-center justify-center text-gray-800 h-screen">
                {/* Seção de login */}
                <section className="flex flex-col items-center justify-center w-1/5 px-12 bg-gray-50 h-full">
                    <img src="vite.svg" alt="Logo escrito TaskFlow" className="mb-7" />
                    <h2 className="text-3xl font-bold mb-11">Build Minds RH</h2>
                    {/* Formulário */}
                    <form
                        className="w-full flex flex-col items-center justify-center gap-7"
                        onSubmit={(login) => {
                            login.preventDefault();
                            console.log('Formulário enviado');
                        }}
                    >
                        <div className="flex flex-col items-center justify-center w-full gap-4 mb-7">
                            <input
                                type="text"
                                placeholder="Usuário"
                                id="usuario"
                                name="usuario"
                                className="w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                            <input
                                type="password"
                                id="senha"
                                placeholder="Senha"
                                name="senha"
                                className="w-full rounded-lg border border-gray-300 py-2 px-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-blue-300 text-gray-800 font-medium text-base py-3 px-6 shadow-md hover:bg-blue-500 disabled:opacity-80">

                        {isLoading ? <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        /> :
                            <span>Entrar</span>
                        }
                        </button>
                        <div className="flex items-center justify-center w-full text-sm text-gray-800 font-normal uppercase gap-2">
                            <div className="flex-grow h-px bg-yellow-500"></div>
                            <span>or</span>
                            <div className="flex-grow h-px bg-yellow-500"></div>
                        </div>
                        <button
                            type="button"
                            className="w-full rounded-lg border bg-blue-300 text-gray-800 font-medium text-base py-3 px-6 hover:bg-blue-500"
                        >
                            <Link to="/cadastro" className="text-indigo-800 hover:underline">
                                Cadastre-se
                            </Link>
                        </button>
                    </form>
                </section>

                {/* Seção direita */}
                <section className="flex flex-col items-center justify-center w-4/5 bg-gradient-to-r from-blue-400 to-blue-300 h-full text-2xl text-gray-800">
                    <h1 className="text-4xl mb-5 font-bold">Develop people, develop a new world!</h1>
                    <img
                        src="vite.svg"
                        alt="Garota, em formato de desenho, usando seu notebook"
                        className="rounded-full object-cover"
                    />
                </section>
            </main>
        </>
    );
}

export default Login;
