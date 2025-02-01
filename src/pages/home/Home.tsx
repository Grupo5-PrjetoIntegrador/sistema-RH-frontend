
function Home() {
    return (
        <>
            <div className="bg-blue-100 flex justify-center ">
                <div className='container grid grid-cols-2 text-blue-950'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Build Minds RH
                        </h2>
                        <p className='text-xl'>Gestão inteligente para equipes de alto desempenho.</p>
                    </div>

                    <div className="flex justify-center items-center">
                        <img
                            src="https://ik.imagekit.io/caciasrs/PI%20-%20Gen%20RH/time-tech.png?updatedAt=1738441458993"
                            alt="Imagem Página Home"
                            className=''
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home