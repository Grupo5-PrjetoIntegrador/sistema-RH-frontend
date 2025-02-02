import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { CursorArrowRaysIcon, CursorArrowRippleIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useFloating, flip, shift, autoUpdate, offset } from '@floating-ui/react';
import { GithubLogo, LinkedinLogo, Mailbox } from '@phosphor-icons/react';

function MenuVitrine({ github, linkedin, email }) {
  const { floatingStyles, refs } = useFloating({
    middleware: [flip(), shift(), offset(20)],
    whileElementsMounted: autoUpdate,
  });

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      alert(`O email foi copiado para o clipboard!`);
    }).catch((err) => {
      console.error('Erro ao copiar o e-mail:', err);
    });
  };

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            ref={refs.setReference}
            className="inline-flex items-center justify-center gap-x-1 text-lg font-semibold text-slate-800 pl-2 focus:outline-none focus:ring-0 hover:text-cor-destaque"
          >
            {open ? (
              <CursorArrowRaysIcon aria-hidden="true" className="size-7" />
            ) : (
              <CursorArrowRippleIcon aria-hidden="true" className="size-7" />
            )}
          </PopoverButton>

          {open && (
            <PopoverPanel
              ref={refs.setFloating}
              style={floatingStyles}
              className="absolute z-10 mt-5 w-96 max-w-sm px-4 transition transform bg-blue-50 rounded-3xl shadow-lg ring-1 ring-blue-950/10"
            >
              <div className="w-full p-4">
                <div className="flex flex-col gap-4">
                  <div className="group flex items-center gap-x-4 p-3 hover:bg-blue-100 rounded-lg border-b border-slate-200">
                    <Link
                      to={github}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-950 hover:font-semibold"
                    >
                      <GithubLogo className="size-8 group-hover:text-purple-800 transition-colors duration-200" />
                      Veja meus Projetos
                    </Link>
                  </div>
                  <div className="group flex items-center gap-x-4 p-3 hover:bg-blue-100 rounded-lg border-b border-slate-200">
                    <Link
                      to={linkedin}
                      target="_blank"
                      className="flex items-center gap-2 text-blue-950 hover:font-semibold"
                    >
                      <LinkedinLogo className="size-8 group-hover:text-cyan-600 transition-colors duration-200" />
                      Conecte-se Comigo
                    </Link>
                  </div>
                  <div className="group flex items-center gap-x-4 p-3 hover:bg-blue-100 rounded-lg">
                    <button
                      onClick={() => copyEmailToClipboard(email)}
                      className="flex items-center gap-2 text-blue-950 hover:font-semibold"
                    >
                      <Mailbox className="size-8 group-hover:text-red-800 transition-colors duration-200" />
                      Me mande um Email
                    </button>
                  </div>
                </div>
              </div>
            </PopoverPanel>
          )}
        </>
      )}
    </Popover>
  );
}

export default MenuVitrine;
