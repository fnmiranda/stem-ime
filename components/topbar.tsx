"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();

  const abas: { label: string; href: string }[] = [
    { label: "Blog", href: "/blog" },
    { label: "Quem Somos", href: "/#quem-somos" },
    { label: "Fotos", href: "/galeria" },
    { label: "Fale Conosco", href: "/#contato" },
  ];

  const [loadingSession, setLoadingSession] = useState(true);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setIsLogged(!!data.session);
      setLoadingSession(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLogged(!!session);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.replace("/");
    router.refresh();
  }

  return (
    <div className="flex flex-row gap-8 w-full h-20 bg-transparent items-center px-10">
      <Link href="/" className="flex w-30 text-3xl text-white font-bold">
        STEMIME
      </Link>

      <div className="flex flex-row w-full gap-6 p-2 mr-4 justify-end items-center">
        {abas.map((aba) => (
          <Link
            key={aba.label}
            href={aba.href}
            className="text-base font-sans text-white cursor-pointer border-b-2 border-transparent
                       hover:border-orange-400 transition-all ease-in-out duration-500"
          >
            {aba.label}
          </Link>
        ))}

        {/* ✅ NOVO: botão Apostilas (só aparece se estiver logado) */}
        {!loadingSession && isLogged && (
          <Link
            href="/apostilas"
            className="text-base font-sans text-white cursor-pointer border-b-2 border-transparent
                       hover:border-orange-400 transition-all ease-in-out duration-500"
          >
            Apostilas
          </Link>
        )}

        {!loadingSession && !isLogged && (
          <Link
            href="/login"
            className="text-sm font-semibold text-black bg-white rounded-lg px-4 py-2
                       hover:opacity-90 transition"
          >
            Entrar
          </Link>
        )}

        {!loadingSession && isLogged && (
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="text-sm font-semibold text-white border border-white/20 rounded-lg px-4 py-2
                         hover:border-white/35 transition"
            >
              Painel
            </Link>

            <button
              onClick={handleLogout}
              className="text-sm font-semibold text-black bg-white rounded-lg px-4 py-2
                         hover:opacity-90 transition"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { TopBar };
