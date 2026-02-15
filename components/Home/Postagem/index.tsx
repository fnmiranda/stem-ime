const Postagem = () => {
  return (
    <div className="flex flex-col h-120 p-4 gap-4 rounded-md bg-amber-100">
      <div className="w-80 h-85 overflow-hidden bg-white text-center text-black  cursor-pointer">
        <img
          src="/images/post2.png"
          className="w-full h-full transition-transform duration-200 hover:scale-105 origin-top"
          alt="post"
        />
      </div>
      <div className="flex flex-col w-80 gap-1 text-justify">
        <div className="text-xs text-gray-900">
          Uma astronauta e aquanauta estadunidense, formada em Física, com
          doutorado em ciências e física espacial.
        </div>
        <div className="text-xs text-gray-600">
          Em 2011, Walker comandou a missão da NASA Extreme Environments Mission
          Operations , na qual ela e sua tripulação se tornaram oficialmente
          aquanautas – passaram mais de 24 horas debaixo d'água. Walker foi a
          35ª pessoa a possuir os títulos de astronauta e aquanauta ao mesmo
          tempo.
        </div>
      </div>
    </div>
  );
};

export { Postagem };
