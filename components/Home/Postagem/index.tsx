const Postagem = () =>{
    return(
        <div className="flex flex-col p-4 rounded-md bg-amber-100">
              <div className="w-80 h-80 bg-white text-center text-black">
                Imagem
              </div>
              <div className="text-base text-black font-bold">Titulo</div>
              <div className="text-base text-black">Descrição</div>
            </div>
    )
}

export {Postagem}