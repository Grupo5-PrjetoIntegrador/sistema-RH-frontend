import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Funcionario.css'
import FormFuncionarios from '../formfuncionarios/FormFuncionarios';

function Funcionario() {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo funcionário
                    </button>
                }
                modal
            >
                <FormFuncionarios />
            </Popup>
        </>
    );
}

export default Funcionario;