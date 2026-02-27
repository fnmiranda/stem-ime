"use client";

import { FaLinkedin } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { FaArrowUpLong } from "react-icons/fa6";
import { Button } from "./ui/Button";

const Footer = () => {
  const startYear = "2010";
  const company = "STEM";
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full mt-6 bg-[#040607] text-gray-300 overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:items-start">
          {/* Coluna 1 */}
          <div className="space-y-4">
            <div className="text-sm font-semibold text-gray-200">
              Nossos Serviços
            </div>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Apostilas
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Postagens
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Ajuda
              </li>
            </ul>

            <Button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#151515] px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-white hover:text-black transition-colors"
            >
              Voltar para cima <FaArrowUpLong />
            </Button>
          </div>

          {/* Coluna 2 (Logo) */}
          <div className="flex md:justify-center">
            <div className="w-42.5 sm:w-50">
              <img
                src="/images/logo-stem.png"
                alt="STEM IME"
                className="h-auto w-full object-contain select-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Coluna 3 */}
          <div className="space-y-3 md:justify-self-end">
            <div className="text-sm font-semibold text-gray-200">
              Fale Conosco
            </div>

            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <RiInstagramLine size={16} />
                <span>@stem.ime</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <FaLinkedin size={16} />
                <span>STEM IME</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <MdEmail size={16} />
                <span>stem@gmail.com</span>
              </div>

              <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                <HiPhone size={16} />
                <span>(21) 00000-0000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs font-semibold text-gray-400">
          © {startYear}–{currentYear} {company}
        </div>
      </div>
    </footer>
  );
};

export { Footer };
