import { FaLinkedin } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { RiInstagramLine } from "react-icons/ri";

const Footer = () => {
  return (
    <div className="flex flex-row h-36 items-center p-10 justify-between text-white bg-[#1a69a6]">
      <div className="text-4xl">
        <strong>Entre em Contato</strong>
      </div>
      <div className="flex flex-col justify-center">
        FALE CONOSCO:
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <RiInstagramLine />
          Instagram
        </div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <FaLinkedin />
          Linkdin
        </div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <MdEmail size={16} />
          E-mail
        </div>
        <div className="flex flex-row items-center gap-2 cursor-pointer">
          <HiPhone size={16} />
          Telefone
        </div>
      </div>
    </div>
  );
};

export { Footer };
