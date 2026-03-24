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
    { label: "Fotos", href: "/#images" },
    { label: "Educa STEM", href: "/apostilas" },
    { label: "Fale Conosco", href: "/#contato" },
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
      setLoadingSession(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLogged(false);
    setMenuOpen(false);

    if (pathname?.startsWith("/admin")) router.replace("/");

    router.refresh();
  }

  function handleNavClick() {
    setMenuOpen(false);
  }

  return (
    <header
      className="fixed left-0 top--20 z-50 w-full"
      style={{
        backgroundImage: "url(/oficial-background.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-[#040607]/25 via-[#040607]/65 to-[#040607]/25" />

      <div className="relative mx-auto flex h-20 w-full max-w-400 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex shrink-0 items-center p-2 text-2xl font-bold text-white"
          aria-label="Ir para a página inicial"
          onClick={handleNavClick}
        >
          <img
            className="h-12 w-auto sm:h-14 md:h-16"
            src="/images/logo-stem.png"
            alt="STEM IME Logo"
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-4 lg:flex xl:gap-6">
          <nav className="flex min-w-0 items-center justify-end gap-4 xl:gap-6">
            {abas.map((aba) => (
              <Link
                key={aba.label}
                href={aba.href}
                className="whitespace-nowrap border-b-2 border-transparent font-sans text-sm text-white transition-all duration-500 ease-in-out hover:border-orange-400 xl:text-base"
              >
                {aba.label}
              </Link>
            ))}
          </nav>

          {!loadingSession && !isLogged && (
            <Link
              href="/login"
              className="shrink-0 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Entrar
            </Link>
          )}

          {!loadingSession && isLogged && (
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/admin"
                className="rounded-lg border border-white/20 bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:border-white/35 hover:bg-white"
              >
                Painel
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:scale-105 hover:cursor-pointer hover:bg-orange-500 hover:text-black hover:opacity-90"
              >
                Sair
              </button>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent p-2 text-white backdrop-blur-sm transition hover:cursor-pointer hover:bg-white/20 lg:hidden"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {menuOpen ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <>
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 top-20 z-20 bg-black/40"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />

          <div
            id="mobile-menu"
            className="absolute left-0 right-0 top-full z-30 border-t border-white/10 bg-linear-to-b from-black/95 to-black/75 backdrop-blur-md"
          >
            <div className="mx-auto flex w-full max-w-400 flex-col gap-2 px-4 py-4 sm:px-6">
              <nav className="flex flex-col">
                {abas.map((aba) => (
                  <Link
                    key={aba.label}
                    href={aba.href}
                    onClick={handleNavClick}
                    className="rounded-xl px-3 py-3 font-sans text-base text-white transition hover:bg-white/10"
                  >
                    {aba.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-2 flex flex-col gap-3 border-t border-white/10 pt-4">
                {!loadingSession && !isLogged && (
                  <Link
                    href="/login"
                    onClick={handleNavClick}
                    className="inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Entrar
                  </Link>
                )}

                {!loadingSession && isLogged && (
                  <>
                    <Link
                      href="/admin"
                      onClick={handleNavClick}
                      className="inline-flex w-full items-center justify-center rounded-lg border border-white/20 bg-orange-500 px-4 py-2 text-sm font-semibold text-black transition hover:border-white/35"
                    >
                      Painel
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="inline-flex w-full items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
                    >
                      Sair
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export { TopBar };
