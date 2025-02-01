import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Bars3Icon, ChevronDoubleDownIcon, HomeModernIcon, PlusCircleIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useFloating, flip, shift, autoUpdate, offset } from '@floating-ui/react';
//import { useRef } from 'react';

const opcoes = [
  { name: 'Funcionários', description: 'Acesse a lista de funcionários', link: '/funcionarios', icon: UsersIcon },
  { name: 'Setores', description: 'Acesse a lista de setores', link: '/setores', icon: HomeModernIcon },
  { name: 'Cadastrar Setor', description: "Cadastre um novo setor", link: '/cadastrarsetor', icon: PlusCircleIcon },
  { name: 'Perfil', description: 'Acesse o seu perfil', link: '/perfil', icon: UserCircleIcon },
];

function Menu() {
  const { floatingStyles, refs } = useFloating({
    middleware: [flip(), shift(), offset(20)],
    whileElementsMounted: autoUpdate,
  });

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton ref={refs.setReference} className="inline-flex items-center justify-center gap-x-1 text-lg font-semibold text-blue-50 pl-2 focus:outline-none focus:ring-0 hover:text-cor-destaque">
            {/* Alterando o ícone com base no estado "open" */}
            {open ? (
              <ChevronDoubleDownIcon aria-hidden="true" className="size-7" />
            ) : (
              <Bars3Icon aria-hidden="true" className="size-7" />
            )}
          </PopoverButton>

          {open && (
            <PopoverPanel
              ref={refs.setFloating}
              style={floatingStyles}
              className="absolute z-10 mt-5 w-96 max-w-sm px-4 transition transform bg-blue-50 rounded-3xl shadow-lg ring-1 ring-blue-950/10"
            >
              <div className="w-full p-4">
                {opcoes.map((item) => (
                  <div key={item.name} className="group flex gap-x-4 rounded-lg p-3 hover:bg-blue-100">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-blue-200 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="size-5 text-blue-950 group-hover:text-cor-destaque" />
                    </div>
                    <div className="flex-1">
                      <Link to={item.link} className="block font-semibold text-blue-950">
                        {item.name}
                      </Link>
                      <p className="mt-1 text-slate-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          )}
        </>
      )}
    </Popover>
  );
}

export default Menu;
