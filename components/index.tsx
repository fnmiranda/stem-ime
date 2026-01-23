const Index = () => {
  return (
    <div className="flex flex-col w-full flex-start justify-center">
      {/* Apresentação */}
      <div className="flex flex-col w-full items-center gap-20 items center"
        style={{backgroundSize:'cover', backgroundImage: 'url(Background.jpg)'}}
      >
        <div className="text-9xl italic mt-10">girls to girls</div>
        <div className="flex flex-col text-base italic items-center">
          "Não há limites para o que nós, como mulheres, podemos realizar"
          <p>Michelle Obama</p>
        </div>
        <div className="text-xs w-100 text-center">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>
        <div className="h-10 w-full bg-blue-400"></div>
      </div>

      {/* Postagens em Destaque */}
      <div className="flex flex-col w-full mt-4 mb-10 gap-4 items-center">
        <div className="text-4xl">POSTAGENS EM DESTAQUE</div>
        {/*Componente Postagens  */}
        <div className="flex flex-row gap-6 ">
          {["1", "2", "3"].map((post, index) => (
            <div key={index} className="flex flex-col p-4 rounded-md bg-amber-100">
              <div className="w-80 h-80 bg-white text-center text-black">
                Imagem
              </div>
              <div className="text-base text-black font-bold">Titulo</div>
              <div className="text-base text-black">Descrição</div>
            </div>
          ))}
        </div>
      </div>
      {/* Quem Somos */}
      <div className="flex flex-col bg-[#1a69a6] items-center gap-4 p-20">
        <div className="text-4xl">QUEM SOMOS?</div>
        <div className="text-justify">
          <p>
            Iniciamos nossas atividades no ano de 2019 com um intercâmbio de
            conhecimentos com a STEM2D, iniciativa do Instituto Tecnológico da
            Aeronáutica, com a participação de alguns de nossos membros no
            evento Engineering Education for The Future, no ITA e com 1º
            Encontro Rede de Mulheres em STEM, no primeiro semestre. Além disso,
            nesse mesmo ano, houve a execução de oficinas ministradas pelos
            membros da STEM IME, no próprio Instituto Militar de Engenharia, aos
            domingos, para 30 jovens meninas de escolas públicas do Rio de
            Janeiro. As oficinas consistiram numa apresentação teórica de um
            assunto da área das ciências exatas, seguidas de aplicação prática
            do que foi exposto.
          </p>
          <p>
            No ano de 2020, nossa equipe foi reestruturada em novas diretorias e
            parte dela participou do I Simpósio Brasileiro Mulheres em STEM
            (SMSTEM), que aconteceu no Instituto Tecnológico da Aeronáutica,
            cujo objetivo foi criar uma rede de interação entre as iniciativas
            para compartilhar e conhecer experiências, discutir os desafios na
            área e para conhecer as ações em andamento. Dos 182 resumos de
            projetos submetidos a serem analisados pelo comitê, apenas 32
            trabalhos foram selecionados para uma apresentação oral. O nosso
            projeto STEM IME foi agraciado como um dos escolhidos e apresentado
            pela professora de matemática do IME, Valéria Saldanha.
          </p>
        </div>
      </div>
      {/* Diretoria */}
      <div className="flex flex-col bg-[#1a69a6] items-center gap-4 p-10">
        <div className="text-4xl">DIRETORIAS</div>
        <div className="flex flex-row gap-6 ">
          {["1", "2", "3", "4"].map((post, index) => (
            <div key={index} className="flex flex-col p-4 rounded-md bg-amber-100">
              <div className="w-80 h-80 bg-white text-center text-black">
                Imagem
              </div>
              <div className="text-base text-black font-bold">Titulo</div>
              <div className="text-base text-black">Descrição</div>
            </div>
          ))}
        </div>
      </div>
      {/* Fotos em Destaque */}
      <div className="flex flex-col bg-white items-center p-10">
        <div className="text-black text-2xl">FOTOS EM DESTAQUE</div>
        
      </div>
    </div>
  );
};

export { Index };
