import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Perfil from './pages/perfil/Perfil';

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
                    {/* <Route path="/setor" element={<ListaSetor />} />
                    <Route path="/cadastrarsetor" element={<FormSetor />} />
                    <Route path="/editarsetor/:id" element={<FormSetor />} />
                    <Route path="/deletarsetor/:id" element={<DeletarSetor />} />
                    <Route path="/funcionarios" element={<ListaFuncionarios />} />
                    <Route path="/cadastrarfuncionario" element={<FormFuncionario />} />
                    <Route path="/editarfuncionario/:id" element={<FormFuncionario />} />
                    <Route path="/deletarfuncionario/:id" element={<DeletarFuncionario />} /> */}
                    <Route path="/perfil" element={<Perfil />} />
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