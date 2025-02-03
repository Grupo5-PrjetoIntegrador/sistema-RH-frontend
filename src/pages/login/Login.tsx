import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import UsuarioLogin from "../../models/UsuarioLogin";
import { ThreeDots } from "react-loader-spinner";

function Login() {
  const navigate = useNavigate();

  const { usuario, handleLogin, isLoading } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  );

  useEffect(() => {
    if (usuario.token !== "") {
      navigate("/home");
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  return (
    <>
      <main className="flex flex-row items-center justify-center text-blue-950 h-screen">
        {/* Seção de login */}
        <section className="flex flex-col items-center justify-center w-2/6 px-14 bg-blue-50 h-full pl-32">
          <img
            src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/logo03.svg?updatedAt=1738427828575"
            alt="Logo Build Minds RH"
            className="mb-7 size-28"
          />
          <h2 className="text-3xl font-bold mb-5">Build Minds RH</h2>
          <p className="mb-11 font-semibold text-slate-500">
            Acesse a plataforma:
          </p>
          {/* Formulário */}
          <form
            className="w-full flex flex-col items-center justify-center gap-7"
            onSubmit={login}
          >
            <div className="flex flex-col items-center justify-center w-full gap-4 mb-7">
              <input
                type="text"
                placeholder="Digite seu Email"
                id="usuario"
                name="usuario"
                className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={usuarioLogin.usuario}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
              <input
                type="password"
                id="senha"
                placeholder="Digite sua Senha"
                name="senha"
                className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={usuarioLogin.senha}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  atualizarEstado(e)
                }
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 text-white font-medium text-base py-3 px-6 shadow-md hover:bg-blue-600 disabled:opacity-80 flex justify-center items-center"
            >
              {isLoading ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="60"
                  color="#1E3A8A"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                <span>Entrar</span>
              )}
            </button>
            <div className="flex items-center justify-center w-full text-md font-normal gap-2">
              <div className="flex-grow h-px bg-slate-300"></div>
              <span className="text-slate-500">Não tem uma conta?</span>
              <div className="flex-grow h-px bg-slate-300"></div>
            </div>
            <button
              type="button"
              className="w-full rounded-lg border bg-blue-500 bg-opacity-80 text-white text-opacity-80 font-medium text-base py-3 px-6 hover:bg-blue-600 hover:text-opacity-100"
            >
              <Link to="/cadastro">Cadastre-se</Link>
            </button>
          </form>
        </section>

        {/* Seção direita */}
        <section className="relative flex flex-col items-center justify-center w-4/6 h-full">
          <img
            src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/background01.jpg?updatedAt=1738425566395"
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-500/60 flex flex-col justify-center items-center">
            <p className="text-5xl mb-5 font-bold text-center">
              Desenvolva pessoas
            </p>
            <p className="text-5xl mb-5 font-bold text-center">
              Desenvolva um novo mundo!
            </p>
            <img
              src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/logo02.svg?updatedAt=1738418330834"
              alt="Imagem Desenvolvimento"
              className="size-48"
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Login;
