import { pessoas } from "../../utils/DevData";
import MenuVitrine from "./MenuVitrine";

export default function Dashboard() {
  return (
    <div className="w-full h-screen grid grid-cols-2 grid-rows-2 gap-4 p-6 bg-gradient-to-b from-blue-300 to-blue-50">
      {pessoas.map((pessoa, index) => (
        <div
          key={index}
          className="flex items-center p-6 border rounded-lg shadow-lg w-full h-full relative bg-slate-200 hover:bg-slate-300"
        >
          <div className="w-1/3 flex justify-center items-center h-full rounded-lg bg-slate-300">
            <img
              src={pessoa.image}
              alt={pessoa.nome}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-2/3 h-full flex flex-col justify-start pl-6 pt-5 gap-3">
            <h3 className="font-semibold text-slate-800 text-3xl">
              {pessoa.nome}
            </h3>
            <hr className="border-t border-slate-500 border-opacity-50" />
            <div className="flex flex-col gap-4">
              <p className="text-slate-700 text-md font-semibold">
                {pessoa.titulo}
              </p>
              <p className="text-slate-700 text-md">{pessoa.descricao}</p>
              <p className="text-slate-700 text-md">
                {" "}
                <span className="font-semibold">Tecnologias:</span>{" "}
                {pessoa.tecnologias}
              </p>
              <p className="text-slate-700 text-md">
                <span className="font-semibold">Fun Fact:</span> {pessoa.funfact}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 absolute top-4 right-4">
            <MenuVitrine
              github={pessoa.github}
              linkedin={pessoa.linkedin}
              email={pessoa.email}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
