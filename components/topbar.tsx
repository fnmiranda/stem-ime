import Link from "next/link";

const TopBar = () => {
  const abas: { label: string; href: string }[] = [
    { label: "Blog", href: "/blog" },
    { label: "Quem Somos", href: "/#quem-somos" }, // ajuste se tiver rota própria
    { label: "Fotos", href: "/galeria" }, // pelo teu print tem /galeria
    { label: "Fale Conosco", href: "/#contato" }, // ajuste se tiver rota própria
    { label: "Entrar", href: "/login" },
  ];

  return (
    <div className="flex flex-row gap-8 w-full h-20 bg-transparent items-center px-10">
      <Link
        href="/"
        className="flex w-30 text-3xl text-white font-bold cursor-pointer"
      >
        STEMIME
      </Link>

      <div className="flex flex-row w-full gap-6 p-2 mr-4 justify-end items-center">
        {abas.map((aba) => {
          const isLogin = aba.label === "Entrar";

          if (isLogin) {
            return (
              <Link
                key={aba.label}
                href={aba.href}
                className="text-sm font-semibold text-black bg-white rounded-lg px-4 py-2
                           hover:opacity-90 transition"
              >
                Entrar
              </Link>
            );
          }

          return (
            <Link
              key={aba.label}
              href={aba.href}
              className="text-base font-sans text-white cursor-pointer border-b-2 border-transparent
                         hover:border-orange-400 transition-all ease-in-out duration-500"
            >
              {aba.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export { TopBar };
