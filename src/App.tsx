import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Perfil from './pages/perfil/Perfil';
import ListaSetores from './components/setores/listasetores/ListaSetores';
import FormSetor from './components/setores/formsetor/FormSetor';
import DeletarSetor from './components/setores/deletarsetor/DeletarSetor';
import ListaFuncionarios from './components/funcionarios/listafuncionarios/ListaFuncionarios';
import FormFuncionarios from './components/funcionarios/formfuncionarios/FormFuncionarios';
import Vitrine from './pages/vitrine/Vitrine';
import DeletarFuncionario from './components/funcionarios/deletefuncionarios/DeleteFuncionarios';

function App() {
    return (
        <>
            <AuthProvider>
              <BrowserRouter>
                <Navbar />
                <div className='min-h-screen bg-blue-50 font-montserrat'>
                  <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/cadastro' element={<Cadastro />} />
                    <Route path="/setores" element={<ListaSetores />} />
                    <Route path="/cadastrarsetor" element={<FormSetor />} />
                    <Route path="/editarsetor/:id" element={<FormSetor />} />
                    <Route path="/deletarsetor/:id" element={<DeletarSetor />} />
                    <Route path="/funcionarios" element={<ListaFuncionarios />} />
                    <Route path="/cadastrarfuncionario" element={<FormFuncionarios />} />
                    <Route path="/editarfuncionario/:id" element={<FormFuncionarios />} />
                    <Route path="/deletarfuncionario/:id" element={<DeletarFuncionario />} />
                    <Route path="/perfil" element={<Perfil />} />
                    <Route path="/desenvolvedores" element={<Vitrine />} />
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