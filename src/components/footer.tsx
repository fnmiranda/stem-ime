"use client";

import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { FaArrowUpLong } from "react-icons/fa6";
import { Button } from "./ui/Button";

const Footer = () => {
  const startYear = 2010;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="relative mt-8 w-full overflow-hidden bg-[#040607] text-gray-300"
    >
      {/* Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: "url('/Background.jpg')" }}
      />
      <div className="absolute inset-0 bg-linear-to-b from-[#040607]/95 via-[#040607]/92 to-[#040607]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-12">
          {/* Coluna 1 */}
          <div className="min-w-0 space-y-5">
            <div>
              <h3 className="text-base font-semibold text-white">
                Nossos Serviços
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-gray-400">
                Conteúdos, apoio acadêmico e divulgação científica para a
                comunidade STEM IME.
              </p>
            </div>

            <ul className="space-y-3 text-sm text-gray-300">
              <li>
                <Link
                  href="/apostilas"
                  className="inline-flex items-center gap-3 transition-colors hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Apostilas
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-3 transition-colors hover:text-white"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Postagens
                </Link>
              </li>
            </ul>

            <Button
              onClick={scrollToTop}
              className="inline-flex w-fit items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-gray-100 transition-all duration-300 hover:bg-white hover:text-black"
            >
              Voltar para cima <FaArrowUpLong />
            </Button>
          </div>

          {/* Coluna 2 */}
          <div className="flex min-w-0 flex-col items-center justify-center gap-4 text-center">
            <div className="w-36 max-w-full sm:w-44 md:w-48">
              <img
                src="/images/logo-stem.png"
                alt="STEM IME"
                className="h-auto w-full object-contain select-none"
                draggable={false}
              />
            </div>

            <p className="max-w-xs text-sm leading-relaxed text-gray-400 sm:max-w-sm">
              Educação, ciência e tecnologia conectando alunos, projetos e
              oportunidades.
            </p>
          </div>

          {/* Coluna 3 */}
          <div className="min-w-0 w-full">
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-5 shadow-[0_0_30px_rgba(255,255,255,0.03)] backdrop-blur-sm sm:p-6">
              <h3 className="text-base font-semibold text-white">
                Fale Conosco
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                Entre em contato pelos nossos canais oficiais.
              </p>

              <div className="mt-5 space-y-3">
                <a
                  href="https://www.instagram.com/stem.ime/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-200 transition group-hover:bg-white/10">
                    <RiInstagramLine size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-200">
                      @stem.ime
                    </p>
                    <p className="text-xs text-gray-400">Instagram oficial</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/company/stem-ime/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-200 transition group-hover:bg-white/10">
                    <FaLinkedin size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-200">
                      STEM IME
                    </p>
                    <p className="text-xs text-gray-400">LinkedIn</p>
                  </div>
                </a>

                <a
                  href="mailto:stemime7@gmail.com"
                  className="group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-300 hover:bg-white/5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/5 text-gray-200 transition group-hover:bg-white/10">
                    <MdEmail size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="break-all text-sm font-medium text-gray-200 sm:break-normal sm:truncate">
                      stemime7@gmail.com
                    </p>
                    <p className="text-xs text-gray-400">E-mail</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs leading-relaxed text-gray-500">
          © {startYear}–{currentYear} STEM IME. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export { Footer };
