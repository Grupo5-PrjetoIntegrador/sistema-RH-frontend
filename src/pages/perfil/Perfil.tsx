import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { LegoSmiley } from "@phosphor-icons/react";


function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  useEffect(() => {
    if (usuario.token === "") {
      alert("Você precisa estar logado");
      navigate("/");
    }
  }, [usuario.token]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="w-full h-2/6">
        <img
          className="w-full h-full object-cover"
          src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/wallpaper-perfil02.png?updatedAt=1738505232818"
          alt="Capa do Perfil"
        />
      </div>

      <div className="flex-1 flex flex-col bg-blue-200 text-blue-950 p-6">
        <div className="absolute left-10 top-64">
          {usuario.foto ? (
            <img
              className="rounded-full w-60 h-60 border-4 border-white bg-blue-50"
              src={usuario.foto}
              alt={`Foto de perfil de ${usuario.nome}`}
            />
          ) : (
            <div className="w-60 h-60 flex items-center justify-center bg-blue-50 border-4 border-white rounded-full">
              <LegoSmiley size={64} />
            </div>
          )}
        </div>

        <div className="mt-36 pl-10 text-2xl flex items-center w-screen">
          <div className=" flex flex-col items-start justify-start h-full w-2/6">
            <p>Nome: {usuario.nome}</p>
            <p>Email: {usuario.usuario}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
