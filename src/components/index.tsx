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
  const listaInfos = [
    {
      title: "DESENVOLVIMENTO INTERNO",
      src: "/images/desenvolvimento.png",
      alt: "Desenvolvimento",
      content:
        "O trabalho da STEM-IME é voluntário, mas como forma de recompensar todo esforço da equipe, temos uma diretoria voltada para o desenvolvimento interno. Nela, a equipe tem capacitações de soft skills e técnicas em áreas relevantes para o mercado de trabalho.",
    },
    {
      title: "FINANCEIRO",
      src: "/images/financeiro.png",
      alt: "Financeiro",
      content:
        "Tem que pagar conta né? rs Sim, temos um time para administrar os ganhos e os gastos, por exemplo dos materiais que compramos para realizar as oficinas.",
    },
    {
      title: "MARKETING",
      src: "/images/marketing.png",
      alt: "Marketing",
      content:
        "Hoje em dia, muita coisa gira em torno da comunicação, por isso, temos um time de marketing para transmitir tudo que a iniciativa produz. Além disso, o marketing é responsável por divulgar dicas, conteúdos, oportunidades e celebrar as conquistas femininas.",
    },
    {
      title: "OFICINAS",
      src: "/images/oficinas.png",
      alt: "Oficinas",
      content:
        "Nossas oficinas são nosso mascotinho! É por meio delas que temos contato com meninas de diversas idades e podemos desenvolver vários experimentos científicos para mostrar a elas como a ciência, a tecnologia, a matemática e a engenharia podem ser o futuro profissional delas.",
    },
    {
      title: "SISTEMA COLÉGIO MILITAR",
      src: "/images/scm.png",
      alt: "SCM",
      content:
        "Essa diretoria é responsável pela parceria com o Sistema Colégio Militar, composto pelos 14 Colégios Militares do Exército que estão espalhados pelo Brasil.",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">
      {/* Apresentação */}
      <section
        className="flex w-full flex-col items-center gap-8 bg-cover bg-center px-4 py-10 sm:gap-10 sm:px-6 md:px-8 lg:py-14"
        style={{
          backgroundImage: "url(/Background.jpg)",
        }}
      >
        <div
          className={`${birthstone.className} text-center italic leading-none text-[clamp(4rem,18vw,12rem)]`}
        >
          girls to girls
        </div>

        <div className="max-w-3xl px-4 text-center text-sm italic sm:text-base">
          “Não há limites para o que nós, como mulheres, podemos realizar”
          <p className="mt-2">Michelle Obama</p>
        </div>

        <div className="w-full max-w-3xl px-4 text-center text-base sm:text-base">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>

        <div className="h-2 w-full bg-blue-400" />
      </section>

      {/* Postagens em Destaque */}
      <section className="flex w-full flex-col items-center gap-6 bg-white px-4 py-10 sm:px-6 md:px-8 lg:py-14">
        <div className="text-center text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          POSTAGENS EM DESTAQUE
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 lg:gap-10">
          <FeaturedPosts limit={3} />
        </div>
      </section>

      {/* Quem Somos */}
      <section
        id="quem-somos"
        className="relative flex w-full flex-col items-center overflow-hidden bg-radial-[at_50%_95%] from-blue-800 via-black/15 to-orange-900 px-4 py-10 sm:px-6 md:px-8 lg:py-14"
      >
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl" />

        <div className="w-full max-w-6xl">
          <div className="mb-8 text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
            QUEM SOMOS?
          </div>

          <div className="w-full font-mono text-justify">
            <div className="flex flex-col gap-8 rounded-2xl p-2 sm:p-4 lg:flex-row lg:items-center lg:gap-10 lg:p-6">
              <div className="flex-1">
                <div>
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                    NOSSA ORIGEM (2019)
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base">
                    Fundado em 2019, o STEM IME nasceu da troca de conhecimentos
                    com a iniciativa STEM2D (ITA). Em nosso primeiro ano,
                    impactamos 30 jovens de escolas públicas do Rio de Janeiro
                    com oficinas práticas e teóricas de exatas, realizadas
                    semanalmente no Instituto Militar de Engenharia.
                  </p>
                </div>

                <div className="mt-8">
                  <h3 className="mb-4 text-2xl font-bold sm:text-3xl">
                    RECONHECIMENTO NACIONAL (2020)
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base">
                    Com uma nova estrutura organizacional, fomos destaque no I
                    Simpósio Brasileiro Mulheres em STEM no ITA. Nosso projeto
                    foi selecionado entre os 32 melhores do país, de 182
                    submissões, para apresentação oral, consolidando nossa
                    atuação na rede nacional de incentivo às mulheres nas
                    ciências e engenharia.
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center justify-center lg:w-90 xl:w-105">
                <img
                  className="h-auto w-full max-w-xs rounded-2xl object-contain sm:max-w-sm lg:max-w-full"
                  src="/images/logo-stem.png"
                  alt="Logo STEM IME"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diretorias */}
      <section className="w-full overflow-x-hidden bg-radial-[at_50%_15%] from-blue-800 via-black/15 to-orange-900 px-4 py-10 sm:px-6 md:px-8 lg:py-14">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
            DIRETORIAS
          </div>

          <div className="mx-auto mt-8 w-full overflow-hidden rounded-xl bg-transparent sm:mt-10">
            <InfiniteImageSlider
              infos={listaInfos}
              itemWidth={300}
              itemHeight={440}
              gap={16}
              durationSec={16}
              direction="left"
              pauseOnHover
              edgeFade
            />
          </div>
        </div>
      </section>

      {/* Fotos em Destaque */}
      <section className="flex w-full flex-col items-center gap-6 overflow-x-hidden bg-white px-4 py-10 sm:px-6 md:px-8 lg:py-14">
        <div className="text-center text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          FOTOS EM DESTAQUE
        </div>

        <div className="w-full max-w-6xl">
          <ComponentCarousel />
        </div>
      </section>
    </div>
  );
};

export { Index };