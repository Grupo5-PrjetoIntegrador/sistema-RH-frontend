import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

function Home() {
    return (
        <>
            <div className="bg-gradient-to-b from-blue-300 to-blue-50 flex justify-center w-full min-h-screen">
                <div className="container grid grid-cols-2 text-blue-950 py-12">
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className="text-5xl font-bold">Build Minds RH</h2>
                        <p className="text-xl">Gestão inteligente para equipes de alto desempenho.</p>

                        {/* Logo com Link para rolar até a seção "Sobre Nós" */}
                        <a href="#sobre-nos">
                            <ArrowDownCircleIcon aria-hidden="true" className="size-16 text-blue-950/75 hover:text-blue-800" />
                        </a>
                    </div>

                    <div className="flex justify-center items-center">
                        <img
                            src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/time-tech.png?updatedAt=1738441458993"
                            alt="Imagem Página Home"
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Seção "Sobre Nós" com ID para ser referenciada */}
            <section id="sobre-nos" className="bg-blue-50 py-32 w-full">
                <div className="container mx-auto text-center px-32">
                    <h3 className="text-3xl font-bold text-blue-950 mb-4">Sobre Nós</h3>
                    <p className="text-lg text-blue-950/75">
                        A Build Minds RH é uma empresa especializada em soluções de gestão de equipes. 
                        Nosso objetivo é transformar organizações ao impulsionar o potencial humano e otimizar a performance dos times.
                        Trabalhamos com inovação, dedicação e comprometimento para que sua empresa tenha sempre os melhores resultados.
                    </p>
                </div>
            </section>
        </>
    );
}

export default Home;
