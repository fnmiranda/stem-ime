import { FaLinkedin } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-row h-36 items-center p-10 justify-between text-white bg-[#1a69a6]">
      <div className="text-4xl font-black">
        Entre em Contato
      </div>
      <div className="flex flex-col text-sm font-bold justify-center">
        FALE CONOSCO:
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <RiInstagramLine size={16}/>
          @stem.ime
        </div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <FaLinkedin size={16}/>
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
  );
};

export { Footer };
