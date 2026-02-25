import { Postagem } from "./Home/Postagem";
import ComponentCarousel from "./Home/Carrosel/carousel";
import Card from "./ui/Card";
import { Input } from "./ui/Input";
import Spinner from "./ui/Spinner";

import { Birthstone } from "next/font/google";
import ImageSlider from "./Home/Carrosel/carousel-test";
import InfiniteImageSlider from "./Home/Carrosel/carousel-test";

const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-birthstone",
});

const Index = () => {
  const listaImagens = [
    { src: "/images/desenvolvimento.png", alt: "1" },
    { src: "/images/financeiro.png", alt: "2" },
    { src: "/images/marketing.png", alt: "3" },
    { src: "/images/oficinas.png", alt: "4" },
    { src: "/images/scm.png", alt: "5" },
  ];

  return (
    <div className="flex flex-col w-full flex-start justify-center">
      {/* Apresentação */}
      <div
        className="flex flex-col w-full items-center gap-20 items center"
        style={{
          backgroundSize: "cover",
          backgroundImage: "url(Background.jpg)",
        }}
      >
        <div className={`${birthstone.className} text-[200px] italic mt-2`}>
          girls to girls
        </div>
        <div className="flex flex-col text-base italic items-center">
          "Não há limites para o que nós, como mulheres, podemos realizar"
          <p>Michelle Obama</p>
        </div>
        <div className="text-xs w-100 text-center opacity-45">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>
        <div className="h-10 w-full bg-blue-400"></div>
      </div>

      {/* Postagens em Destaque */}
      <div className="flex flex-col bg-white w-full p-10 gap-4 items-center">
        <div className="text-gray-700 font-bold text-5xl mt-4 mb-8">
          POSTAGENS EM DESTAQUE
        </div>
        {/*Componente Postagens  */}
        <div className="flex flex-row gap-10 ">
          {["1", "2", "3"].map((post, index) => (
            <Postagem key={index} />
          ))}
        </div>
      </div>
      {/* Quem Somos */}
      <div className="flex flex-col items-center text-gray-700 bg-linear-to-r from-[#fd8907] to-amber-100 gap-4 p-20">
        <div className="text-left font-bold mb-5 text-5xl">QUEM SOMOS?</div>
        <div className="w-[86%] text-justify font-mono">
          {/* Bloco 2019: Origem */}
          <div
            className="flex flex-row h-120 gap-6 py-2 items-center bg-linear-to-r from-[#fd8a07bb] to-amber-100
             mask-y-from-88% mask-y-to-96% mask-r-from-98% mask-r-to-100%"
          >
            <div className="flex flex-col gap-4 flex-[6_6_0%]">
              <div>
                <h3 className="text-5xl font-bold mb-8">NOSSA ORIGEM (2019)</h3>
                <p className="leading-relaxed">
                  Fundado em 2019, o STEM IME nasceu da troca de conhecimentos
                  com a iniciativa STEM2D (ITA). Em nosso primeiro ano,
                  impactamos 30 jovens de escolas públicas do Rio de Janeiro com
                  oficinas práticas e teóricas de exatas, realizadas
                  semanalmente no Instituto Militar de Engenharia.
                </p>
              </div>
              <div>
                <h3 className="text-[2.6rem] font-bold mb-8">
                  RECONHECEMENTO NACIONAL (2020)
                </h3>
                <p className="w-200 leading-relaxed">
                  Com uma nova estrutura organizacional, fomos destaque no I
                  Simpósio Brasileiro Mulheres em STEM no ITA. Nosso projeto foi
                  selecionado entre os 32 melhores do país (de 182 submissões)
                  para apresentação oral, consolidando nossa atuação na rede
                  nacional de incentivo às mulheres nas ciências e engenharia.
                </p>
              </div>
            </div>

            <img
              className="flex-[4_4_0%] w-full h-98 object-cover"
              src="/images/stem-background.png"
              alt="Atividades STEM IME 2019"
            />
          </div>
        </div>
      </div>
      {/* Diretoria */}
      <div className="flex flex-col bg-linear-to-r from-[#fd8907] to-amber-100 items-center gap-4 p-10">
        <div className="text-5xl font-bold">DIRETORIAS</div>
        <div className="flex flex-row gap-6 ">
          {listaImagens.map((url, index) => (
            <div
              key={index}
              className="flex flex-col w-64 p-2 rounded-md bg-blue-200"
            >
              <div className="w-60 h-60 items-center justify-center bg-white text-center text-black">
                <img src={url.src} />
              </div>
              <div className="text-base text-black font-bold">Marketing</div>
              <div className="text-xs text-gray-700 text-justify">
                Hoje em dia, muita coisa gira em torno da comunicação, por isso,
                temos um time de marketing para transmitir tudo que a iniciativa
                produz. Além disso, o markenting é responsável por divulgar
                dicas, conteúdos, oportunidades e celebrar as conquistas
                femininas.
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Fotos em Destaque */}
      <div className="flex flex-col py-8 bg-white items-center p-10">
        <div className="text-gray-700 text-5xl font-bold">
          FOTOS EM DESTAQUE
        </div>
        <ComponentCarousel />
        <div style={{ maxWidth: 980, margin: "40px auto", background: "#fff" }}>
          <InfiniteImageSlider
            images={listaImagens}
            itemWidth={640}
            itemHeight={460}
            gap={16}
            durationSec={16}
            direction="left"
            pauseOnHover
            edgeFade
          />
        </div>
      </div>
    </div>
  );
};

export { Index };
