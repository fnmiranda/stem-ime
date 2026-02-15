'use client'
import { FaLinkedin } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";
import { Button } from "./ui/Button";

const Footer = () => {
  const startYear = "2010";
  const company = "STEM"
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="flex items-center w-full justify-center mt-2">
      <div className="flex flex-col w-[90%] h-46 items-center justify-between p-10 rounded-2xl text-white bg-[#040607]">
        <div className="flex flex-row w-full items-center justify-between ">
          <div className="flex flex-col text-4xl font-black">
            <span className="flex flex-row items-center gap-4 "><MdEmail size={40}/> Entre em Contato</span>
            <Button
              onClick={scrollToTop}
              label="VOLTAR PARA CIMA"
              className="mt-4 p-2 text-sm border-2 rounded-2xl bg-[#000000] hover:bg-[#1e20a799] cursor-pointer"
            />
          </div>
          <div className="flex flex-col text-sm font-bold justify-center">
            FALE CONOSCO:
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
        <div className="text-sm mt-2 max-w-full font-bold text-white bg-[#030000] h-[106%] w-[105%] text-center">© {startYear}–{currentYear} {company}</div>
      </div>
    </div>
  );
};

export { Footer };
