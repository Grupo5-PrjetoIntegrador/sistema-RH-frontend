// opcoes.js
import { UsersIcon, UserPlusIcon, HomeModernIcon, PlusCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline'; // Exemplo de importação dos ícones

const opcoes = [
  { name: 'Funcionários', description: 'Acesse a lista de funcionários', link: '/funcionarios', icon: UsersIcon },
  { name: 'Cadastrar Funcionário', description: "Cadastre um novo Funcionário", link: '/cadastrarfuncionario', icon: UserPlusIcon },
  { name: 'Setores', description: 'Acesse a lista de setores', link: '/setores', icon: HomeModernIcon },
  { name: 'Cadastrar Setor', description: "Cadastre um novo setor", link: '/cadastrarsetor', icon: PlusCircleIcon },
  { name: 'Perfil', description: 'Acesse o seu perfil', link: '/perfil', icon: UserCircleIcon },
];

export default opcoes;
