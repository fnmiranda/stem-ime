import { Postagem } from "./Home/Postagem";
import ComponentCarousel from "./Home/Carrosel/carousel";

import { Birthstone } from "next/font/google";
import InfiniteImageSlider from "./Home/Carrosel/carousel-test";
import FeaturedPosts from "@/src/components/Home/FeaturedPosts";
const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-birthstone",
});

const Index = () => {
  const listaImagens = [
    { src: "/images/desenvolvimento.png", alt: "Desenvolvimento" },
    { src: "/images/financeiro.png", alt: "Financeiro" },
    { src: "/images/marketing.png", alt: "Marketing" },
    { src: "/images/oficinas.png", alt: "Oficinas" },
    { src: "/images/scm.png", alt: "SCM" },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-x-hidden">
      {/* Apresentação */}
      <div
        className="flex w-full flex-col items-center gap-10"
        style={{
          backgroundSize: "cover",
          backgroundImage: "url(/Background.jpg)",
        }}
      >
        <div
          className={`${birthstone.className} mt-2 px-4 text-center italic leading-none
          text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px]`}
        >
          girls to girls
        </div>

        <div className="flex flex-col items-center px-6 text-center text-base italic">
          “Não há limites para o que nós, como mulheres, podemos realizar”
          <p className="mt-2">Michelle Obama</p>
        </div>

        <div className="w-full max-w-3xl px-6 text-center text-xs opacity-45">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>

        <div className="h-2 w-full bg-blue-400" />
      </div>

      {/* Postagens em Destaque */}
      <div className="flex w-full flex-col items-center gap-6 bg-white px-6 py-12">
        <div className="mt-2 text-center text-5xl font-bold text-gray-700">
          POSTAGENS EM DESTAQUE
        </div>

        {/* antes: flex-row que podia estourar */}
        <div className="grid w-full max-w-6xl grid-cols-1 gap-10 md:grid-cols-3">
          <FeaturedPosts limit={3} />
        </div>
      </div>

      {/* Quem Somos */}
      <div
        id="quem-somos"
        className="flex w-full flex-col py-6 items-center gap-6 bg-radial-[at_50%_95%] from-blue-800 via-black/15 to-orange-900"
      >
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl transition group-hover:bg-[#4fa3ff]/25" />
        {/* <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-orange-400 transition-all duration-500 group-hover:w-full" /> */}
        <div className="w-full py-2 max-w-6xl">
          <div className="mb-6 w-full  text-5xl text-center font-bold">
            QUEM SOMOS?
          </div>

          <div className="w-full text-justify font-mono">
            {/* Bloco 2019: Origem */}
            <div className="flex flex-row gap-8  p-6">
              <div className="flex flex-col gap-8">
                <div>
                  <h3 className="mb-6 text-4xl font-bold">
                    NOSSA ORIGEM (2019)
                  </h3>
                  <p className="leading-relaxed">
                    Fundado em 2019, o STEM IME nasceu da troca de conhecimentos
                    com a iniciativa STEM2D (ITA). Em nosso primeiro ano,
                    impactamos 30 jovens de escolas públicas do Rio de Janeiro
                    com oficinas práticas e teóricas de exatas, realizadas
                    semanalmente no Instituto Militar de Engenharia.
                  </p>
                </div>

                <div>
                  <h3 className="mb-6 text-3xl font-bold">
                    RECONHECEMENTO NACIONAL (2020)
                  </h3>
                  <p className="leading-relaxed">
                    Com uma nova estrutura organizacional, fomos destaque no I
                    Simpósio Brasileiro Mulheres em STEM no ITA. Nosso projeto
                    foi selecionado entre os 32 melhores do país (de 182
                    submissões) para apresentação oral, consolidando nossa
                    atuação na rede nacional de incentivo às mulheres nas
                    ciências e engenharia.
                  </p>
                </div>
              </div>

              <img
                className="w-100 rounded-xl object-cover "
                src="images/logo-stem.png"
                alt="Atividades STEM IME 2019"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Diretoria */}
      <div className="w-full bg-radial-[at_50%_15%] from-blue-800 via-black/15 to-orange-900 px-6 py-12 overflow-x-hidden">
        <div className="mx-auto w-full max-w-9xl">
          <div className="text-center text-5xl font-bold">DIRETORIAS</div>
          <div className="mx-auto mt-10 w-full max-w-9xl overflow-hidden rounded-xl bg-transparent">
            <InfiniteImageSlider
              images={listaImagens}
              itemWidth={340}
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

      {/* Fotos em Destaque */}
      <div className="flex w-full flex-col items-center gap-6 bg-white px-6 py-12 overflow-x-hidden">
        <div className="text-center text-5xl font-bold text-gray-700">
          FOTOS EM DESTAQUE
        </div>

        <div className="w-full max-w-6xl">
          <ComponentCarousel />
        </div>
      </div>
    </div>
  );
};

export { Index };
