"use client";
import { FaLinkedin } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { Button } from "./ui/Button";
import { FaArrowUpLong } from "react-icons/fa6";

const Footer = () => {
  const startYear = "2010";
  const company = "STEM";
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex items-center w-full justify-center mt-2">
      <div className="flex flex-col w-[90%] h-46 items-center justify-between p-10 rounded-2xl text-gray-400 bg-[#040607]">
        <div className="flex flex-row w-full items-center gap-2 justify-between ">
          <div className="flex flex-col text-md font-black">
            <div className="flex gap-2">
              Nossos Serviços:
              <ul>
                <li>Apostilas</li>
                <li>Postagens</li>
                <li>Ajuda</li>
              </ul>
            </div>
            <Button
              onClick={scrollToTop}
              className="flex flex-row items-center justify-center font-bold gap-4 mt-4 p-2 text-sm hover:border-2 rounded-2xl bg-[#151515] hover:bg-[#ffffff] hover:text-black cursor-pointer"
            >
              VOLTAR PARA CIMA
              <FaArrowUpLong />
            </Button>
          </div>
          <div className="flex h-30 w-100 cursor-pointer">
            <img src="/images/logo-stem.png" alt="logo" />
          </div>

          <div className="flex flex-col text-sm font-bold gap-1 text-gray-400 justify-center">
            <span className="mb-2">FALE CONOSCO:</span>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <RiInstagramLine size={16} />
              @stem.ime
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <FaLinkedin size={16} />
              STEM IME
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <MdEmail size={16} />
              stem@gmail.com
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <HiPhone size={16} />
              (21) 00000-0000
            </div>
          </div>
        </div>
        <div className="text-sm mt-2 max-w-full font-bold text-gray-300 py-10 bg-[#030000] h-[106%] w-[105%] text-center">
          © {startYear}–{currentYear} {company}
        </div>
      </div>
    </div>
  );
};

export { Footer };
