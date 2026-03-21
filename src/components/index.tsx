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
        "O trabalho da STEM-IME é voluntário, mas como forma de recompensar todo esforço da equipe, temos uma diretoria voltada pra o desenvolvimento interno. Nela, a equipe tem capacitações de soft skills e técnicas em áreas relevantes para o mercado de trabalho.",
    },
    {
      title: "FINANCEIRO",
      src: "/images/financeiro.png",
      alt: "Financeiro",
      content:
        "Tem que pagar conta né? rs Sim, temos um time para administrar os ganhos e os gastos, por exemplo dos materias que compramos para realizar as oficinas.",
    },
    {
      title: "MARKETING",
      src: "/images/marketing.png",
      alt: "Marketing",
      content:
        "Hoje em dia, muita coisa gira em torno da comunicação, por isso, temos um time de marketing para transmitir tudo que a iniciativa produz. Além disso, o markenting é responsável por divulgar dicas, conteúdos, oportunidades e celebrar as conquistas femininas.",
    },
    {
      title: "OFICINAS",
      src: "/images/oficinas.png",
      alt: "Oficinas",
      content:
        "Nossas oficinas são nosso mascotinho! É por meio delas que temos contato com meninas de diversas idades e podemos desenvolver vários experimentos científicos para mostrar à elas como a ciência, a tecnologia, a matemática e a engenharia pode ser o futuro profissional delas! ",
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
    <div className="flex w-full flex-col items-center justify-center overflow-x-hidden">
      {/* Apresentação */}
      <section
        className="flex w-full flex-col items-center gap-8 overflow-hidden px-4 pb-0 pt-4 sm:gap-10 sm:px-6 lg:px-8"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        backgroundImage: "url(/oficial-background.jpg)"
        }}
      >
        <div
          className={`${birthstone.className} mt-2 text-center italic leading-none text-[clamp(4rem,14vw,12.5rem)]`}
        >
          girls to girls
        </div>

        <div className="max-w-3xl px-2 text-center text-sm italic sm:text-base">
          “Não há limites para o que nós, como mulheres, podemos realizar”
          <p className="mt-2">Michelle Obama</p>
        </div>

        <div className="w-full max-w-3xl px-2 text-center text-sm opacity-45 sm:text-xs">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>

        <div className="h-2 w-full bg-blue-400" />
      </section>

      {/* Postagens em Destaque */}
      <section className="flex w-full flex-col items-center gap-6 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="mt-2 text-center text-3xl font-bold text-gray-700 sm:text-4xl lg:text-5xl">
          POSTAGENS EM DESTAQUE
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
          <FeaturedPosts limit={3} />
        </div>
      </section>

      {/* Quem Somos */}
      <section
        id="quem-somos"
        className="relative flex w-full flex-col items-center gap-6 overflow-hidden bg-radial-[at_50%_95%] from-blue-800 via-black/15 to-orange-900 px-4 py-8 sm:px-6 lg:px-8"
      >
        <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[#4fa3ff]/15 blur-3xl transition group-hover:bg-[#4fa3ff]/25" />

        <div className="w-full max-w-6xl py-2">
          <div className="mb-6 w-full text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
            QUEM SOMOS?
          </div>

          <div className="w-full font-mono text-justify">
            <div className="flex flex-col gap-8 rounded-2xl p-2 sm:p-4 lg:flex-row lg:items-start lg:gap-10 lg:p-6">
              <div className="flex min-w-0 flex-1 flex-col gap-8">
                <div>
                  <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl lg:text-4xl">
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

                <div>
                  <h3 className="mb-4 text-2xl font-bold sm:mb-6 sm:text-3xl">
                    RECONHECEMENTO NACIONAL (2020)
                  </h3>
                  <p className="text-sm leading-relaxed sm:text-base">
                    Com uma nova estrutura organizacional, fomos destaque no I
                    Simpósio Brasileiro Mulheres em STEM no ITA. Nosso projeto
                    foi selecionado entre os 32 melhores do país (de 182
                    submissões) para apresentação oral, consolidando nossa
                    atuação na rede nacional de incentivo às mulheres nas
                    ciências e engenharia.
                  </p>
                </div>
              </div>

              <div className="flex w-full justify-center lg:w-100 lg:shrink-0">
                <div className="w-full max-w-100 rounded-2xl p-2">
                  <img
                    className="h-auto max-h-112 w-full rounded-xl object-contain lg:object-cover"
                    src="/images/logo-stem.png"
                    alt="Atividades STEM IME 2019"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diretoria */}
      <section className="w-full overflow-x-hidden bg-radial-[at_50%_15%] from-blue-800 via-black/15 to-orange-900 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-400">
          <div className="text-center text-3xl font-bold sm:text-4xl lg:text-5xl">
            DIRETORIAS
          </div>

          <div className="mx-auto mt-10 w-full max-w-400 overflow-hidden rounded-xl bg-transparent">
            <InfiniteImageSlider
              infos={listaInfos}
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
      </section>

      {/* Fotos em Destaque */}
      <section className="flex w-full flex-col items-center gap-6 overflow-x-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">
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