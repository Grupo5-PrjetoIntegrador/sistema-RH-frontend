function FormFuncionarios() {
    return (
        <div className=" flex flex-col items-center justify-center w-full h-screen bg-gradient-to-b from-blue-300 to-blue-50">
            <h1 className="text-4xl text-center my-8 font-semibold text-blue-950">Cadastrar funcionário</h1>

            <form className="flex flex-col w-1/2 gap-8 items-center justify-center">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="titulo">Nome</label>
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="titulo">Cargo</label>
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    />
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <p>Setor</p>
                    <select name="setor" id="setor" className='w-full rounded-lg border border-slate-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-300' >
                        <option value="" selected disabled>Selecione o setor</option>
                        
                        <>
                            <option>setor1</option>
                        </>

                    </select>
                </div>
                <button type='submit' className='w-1/3 rounded-lg bg-blue-500 text-white font-medium text-base py-3 px-6 shadow-md hover:bg-blue-600 disabled:opacity-80 flex justify-center items-center'
                >
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default FormFuncionarios;