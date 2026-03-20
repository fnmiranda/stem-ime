"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/src/services/supabaseClient";
import { usePathname, useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const abas: { label: string; href: string }[] = [
    { label: "Blog", href: "/blog" },
    { label: "Quem Somos", href: "/#quem-somos" },
    { label: "Educa STEM", href: "/apostilas" },
    { label: "Fale Conosco", href: "#footer" },
  ];

  const [loadingSession, setLoadingSession] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLogged(!!data.session);
      setLoadingSession(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLogged(false);
    setMenuOpen(false);

    if (pathname?.startsWith("/admin")) router.replace("/");

    router.refresh();
  }

  return (
    <header
      className="sticky top-0 z-50 w-full bg-cover bg-center"
      style={{
        backgroundImage: "url(/background-escuro.jpg)",
      }}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Ir para a página inicial"
        >
          <img
            className="h-11 w-auto sm:h-12 md:h-14"
            src="/images/logo-stem.png"
            alt="STEM IME logo"
          />
        </Link>

        <nav className="hidden items-center gap-5 md:flex lg:gap-6">
          {abas.map((aba) => (
            <Link
              key={aba.label}
              href={aba.href}
              className="border-b-2 border-transparent text-sm font-medium text-white transition-all duration-300 hover:border-orange-400 lg:text-base"
            >
              {aba.label}
            </Link>
          ))}

          {!loadingSession && !isLogged && (
            <Link
              href="/login"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Entrar
            </Link>
          )}

          {!loadingSession && isLogged && (
            <div className="flex items-center gap-3">
              <Link
                href="/admin"
                className="rounded-lg border border-white/20 bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Painel
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              >
                Sair
              </button>
            </div>
          )}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 text-white md:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span className="text-xl leading-none">{menuOpen ? "✕" : "☰"}</span>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/80 px-4 py-4 backdrop-blur md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-3">
            {abas.map((aba) => (
              <Link
                key={aba.label}
                href={aba.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
              >
                {aba.label}
              </Link>
            ))}

            {!loadingSession && !isLogged && (
              <Link
                href="/login"
                className="mt-2 rounded-lg bg-white px-4 py-2 text-center text-sm font-semibold text-black transition hover:opacity-90"
              >
                Entrar
              </Link>
            )}

            {!loadingSession && isLogged && (
              <div className="mt-2 flex flex-col gap-3">
                <Link
                  href="/admin"
                  className="rounded-lg border border-white/20 bg-orange-500 px-4 py-2 text-center text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Painel
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Sair
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export { TopBar };