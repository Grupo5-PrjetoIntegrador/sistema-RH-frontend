import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import ListaFuncionarios from './components/funcionarios/listafuncionarios/ListaFuncionarios';
import FormFuncionarios from './components/funcionarios/formfuncionarios/FormFuncionarios';

function App() {
    return (
        <>
            <AuthProvider>
              <BrowserRouter>
                <Navbar />
                <div className='min-h-[-80vh]'>
                  <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path='/cadastrofuncionario' element={<FormFuncionarios />} />
                    <Route path='/listafunc' element={<ListaFuncionarios />} />
                  </Routes>
                </div>
                <Footer />
              </BrowserRouter>
            </AuthProvider>
        </>
    )
  return (
    <>
      
    </>
  );
}

export default App;