const Footer = () =>{
    return (
        <div className="flex flex-row h-36 items-center p-10 justify-between text-white bg-[#1a69a6]">
            <div className="text-4xl">Entre em Contato</div>
            <div className="flex flex-col justify-center">
                FALE CONOSCO:
                <div className="cursor-pointer">
                    Instagram
                </div>
                <div className="cursor-pointer">
                    Linkdin
                </div>
                <div className="cursor-pointer">
                    E-mail
                </div>
                <div className="cursor-pointer">
                    Telefone
                </div>
            </div>
        </div>
    )
}

export {Footer}