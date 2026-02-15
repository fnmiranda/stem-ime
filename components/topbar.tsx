const TopBar = () => {
    const abas:string[] = [
        'Blog', 'Quem Somos', 'Fotos', 'Fale Conosco', 'Entrar'
    ]

    return(
        <div className="flex flex-row gap-8 w-full h-20 bg-transparent items-center p-10">
            <div className="flex h-18 w-100 text-2xl text-white font-bold cursor-pointer">
                <img src="/images/logo-stem.png" alt="logo" />
            </div>
            <div className="flex flex-row w-full gap-20 p-2 mr-4 justify-evenly">
            {abas.map((aba,index) =>
                <div key={index} className="text-base font-sans text-white cursor-pointer border-b-2 border-black
                   hover:border-b-2 hover:border-orange-400 transition-all ease-in-out duration-500
                ">
                    {aba}
                </div>
            )}

            </div>
        </div>
    )
}

export {TopBar}