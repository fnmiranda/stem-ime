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
      title: "CRESCIMENTO INTERNO",
      src: "/images/4-removebg-preview.png",
      alt: "Desenvolvimento",
      content:
        "Responsável pelo desenvolvimento dos integrantes da equipe, promovendo treinamentos, capacitações e workshops voltados ao crescimento pessoal e profissional. Dentro dessa diretoria, existe o Impacta STEM, um núcleo dedicado a ampliar o impacto social da organização por meio de parcerias com ONGs, além da promoção de ações voltadas para a sociedade",
    },
    {
      title: "GESTÃO E FINANCEIRO",
      src: "/images/5-removebg-preview.png",
      alt: "Financeiro",
      content:
        "Responsável pela organização interna da STEM, da gestão de recursos e do controle orçamentário. Também é responsável por estruturar processos seletivos e organizar imersões, garantindo o bom funcionamento da equipe.",
    },
    {
      title: "MARKETING",
      src: "/images/6-removebg-preview.png",
      alt: "Marketing",
      content:
        " Responsável pela comunicação da STEM, incluindo redes sociais como Instagram e LinkedIn, identidade visual e divulgação das ações e projetos, ampliando o alcance e a visibilidade da iniciativa.",
    },
    {
      title: "OFICINAS",
      src: "/images/1-removebg-preview.png",
      alt: "Oficinas",
      content:
        "Planeja e executa atividades educacionais, principalmente voltadas para escolas e projetos sociais, como as Oficinas Científicas e as mentorias online para garotas de todo o Brasil, que são alguns dos principais meios de impacto da STEM.",
    },
    {
      title: "STEM FAIR",
      src: "/images/2-removebg-preview (1).png",
      alt: "SCM",
      content:
        "Stua na realização da feira de ciências da STEM, ampliando o alcance da iniciativa e incentivando projetos de estudantes de ensino médio, além de apoiar a feira de ciências do Colégio Militar do Rio de Janeiro.",
    },
    {
      title: "EDUCA STEM",
      src: "/images/3-removebg-preview.png",
      alt: "EDUCA",
      content:
        " Tem como foco a atuação direta na educação, organizando o envio de alunos voluntários para um colégio parceiro, onde são realizadas aulas de reforço e tiragem de dúvidas, contribuindo diretamente para o aprendizado dos estudantes. O setor de Apostilas é subordinado ao Educa STEM, sendo a parte responsável pelo desenvolvimento de materiais didáticos, como apostilas de matemática, física e química, que serão disponibilizadas gratuitamente para estudantes de todo o Brasil, ampliando o alcance educacional da iniciativa.",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-x-hidden">
      {/* Apresentação */}
      <section
        className="relative isolate flex w-full flex-col items-center gap-8 overflow-hidden px-4 pb-0 pt-4 sm:gap-10 sm:px-6 lg:px-8"
        style={{
          backgroundImage: "url(/oficial-background.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#020617",
        }}
      >
        {/* camada escura */}
        <div className="absolute inset-0 -z-10 bg-black/55" />

        {/* gradiente para reforçar leitura */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.60)_45%,rgba(0,0,0,0.45)_100%)]" />

        <div
          className={`${birthstone.className} relative z-10 mt-2 text-center italic leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] text-[clamp(4rem,14vw,12.5rem)]`}
        >
          girls to girls
        </div>

        <div className="relative z-10 max-w-3xl rounded-2xl bg-black/35 px-4 py-3 text-center text-sm italic text-white shadow-lg backdrop-blur-[2px] sm:text-base">
          “Não há limites para o que nós, como mulheres, podemos realizar”
          <p className="mt-2 font-medium">Michelle Obama</p>
        </div>

        <div className="relative z-10 w-full max-w-3xl rounded-2xl bg-black/40 px-4 py-4 text-center text-base italic leading-relaxed text-white/90 shadow-lg backdrop-blur-[2px] max-sm:text-xs">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>

        <div className="relative z-10 h-2 w-[110%] bg-blue-400" />
      </section>

      {/* Postagens em Destaque */}
      <section className="flex w-full flex-col items-center gap-6 bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="font-sans text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
          Postagens em Destaque
        </div>

        <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10">
          <FeaturedPosts limit={3} />
        </div>
      </section>
      <div className="relative h-2 w-[110%] bg-orange-400" />

      {/* Quem Somos */}
      <section
        id="quem-somos"
        className="font-sans w-full bg-linear-to-b from-orange-200 via-orange-100 to-blue-200 py-16 text-neutral-800 sm:py-20 lg:py-24"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Cabeçalho de Navegação e Título */}
          <div className="mb-12 flex flex-col gap-3 lg:mb-16">
            <div className="flex gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400">
              <span>[ Início /</span>
              <span className="text-blue-600">Quem Somos ]</span>
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Transformando a Engenharia <br /> Através da Educação
            </h2>
          </div>

          {/* Manifesto Curto */}
          <p className="mb-16 max-w-9xl text-left text-lg leading-relaxed text-neutral-600 lg:mb-24">
            A STEM IME é uma iniciativa voltada para incentivar meninas a
            ingressarem nas áreas de ciência e tecnologia por meio de ações
            práticas e inspiradoras. Realizamos diversas atividades como visitas
            a escolas, oficinas científicas trazendo alunas de colégios públicos
            para o IME, aulas de reforço em colégios parceiros, apoio à feira de
            ciências do Colégio Militar do Rio de Janeiro e eventos em parceria
            com ONGs. Além disso, também promovemos eventos e workshops voltados
            para a capacitação interna, muitas vezes em parceria com empresas, e
            desenvolvemos materiais didáticos gratuitos para estudantes de todo
            o país. Dessa forma, conseguimos gerar impacto tanto na sociedade
            quanto no desenvolvimento dos nossos próprios membros.
          </p>

          {/* Seção: Nossa Origem */}
          <div className="mb-24 flex flex-col gap-12 lg:mb-32 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-extrabold text-neutral-950 lg:text-4xl">
                Nossa Origem
              </h3>
              <p className="text-base leading-relaxed text-neutral-600">
                A STEM IME é uma iniciativa estudantil criada em 2018 no
                Instituto Militar de Engenharia, a partir da percepção da baixa
                representatividade feminina nas áreas de ciência, tecnologia,
                engenharia e matemática. O projeto nasceu do desejo de alunas do
                instituto de gerar impacto real, incentivando meninas a se
                interessarem por essas áreas desde cedo. Desde o início, nossas
                ações foram voltadas para levar oficinas, mentorias e atividades
                educacionais a alunas de escolas públicas, aproximando as
                ciências exatas de forma acessível, prática e inspiradora. Ao
                longo dos anos, a STEM IME se consolidou como um grupo de
                extensão muito ativo dentro do IME, fortalecendo a conexão entre
                universidade e sociedade.
              </p>
            </div>

            <div className="relative w-full lg:w-[48%]">
              <div className="relative aspect-5/3 w-full overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/images/inicial/img1.jpeg"
                  alt="Atividades STEM no IME"
                  className="h-full w-full object-cover"
                />

                <div className="absolute bottom-6 left-6 h-22 w-22 max-sm:h-12 max-sm:w-12 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                  <img
                    src="/android-chrome-512x512.png"
                    className="h-full w-full bg-white object-cover"
                    alt="Logo STEM detalhe"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Objetivos */}
          <div className="flex flex-col-reverse gap-12 lg:flex-row-reverse lg:items-center lg:gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-extrabold text-neutral-950 lg:text-4xl">
                Objetivos
              </h3>
              <p className="text-base leading-relaxed text-neutral-600">
                Nossa iniciativa tem como principal objetivo incentivar e
                ampliar a participação feminina nas áreas STEM, atuando tanto
                dentro quanto fora do IME. Para isso, desenvolvemos ações que
                promovem educação científica, inclusão e equidade de gênero.
                Além do impacto externo, também valorizamos muito o
                desenvolvimento interno dos nossos membros, proporcionando um
                ambiente de crescimento pessoal e profissional. Buscamos formar
                lideranças, estimulando habilidades como comunicação,
                organização, trabalho em equipe e protagonismo feminino.
              </p>
            </div>

            <div className="relative w-full lg:w-[48%]">
              <div className="relative aspect-5/3 w-full overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="/images/inicial/img2.jpg"
                  alt="Apresentação no Simpósio ITA"
                  className="h-full w-full object-cover"
                />
                <div className="absolute -bottom-6 -right-2 flex h-28 w-28 items-center justify-center rounded-full border-2 border-neutral-100 bg-white p-2 text-center font-mono text-[10px] leading-tight text-neutral-900 shadow-lg max-sm:h-0 max-sm:w-0">
                  S T E M — I M E <br /> 2 0 2 0 <br /> ★ ★ ★
                </div>
                <div className="absolute left-8 top-8 h-32 w-40 max-sm:h-16 max-sm:w-20 overflow-hidden rounded-2xl border-4 border-white shadow-xl">
                  <img
                    src="/stem-logo2.png"
                    className="h-full w-full object-cover"
                    alt="Equipe no Simpósio"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="relative h-2 w-[110%] bg-blue-400" />

      {/* Diretoria */}
      <section className="w-full overflow-hidden bg-neutral-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="mb-12 flex flex-col items-center gap-3 text-center lg:mb-16">
            <div className="flex gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400">
              <span>[ Estrutura /</span>
              <span className="text-blue-600">Equipe ]</span>
            </div>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Nossas Diretorias
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="relative mt-10 w-full max-w-400 overflow-visible">
            <div className="min-w- w-full rounded-2xl bg-white/50 p-4 shadow-sm backdrop-blur-sm lg:p-2">
              <InfiniteImageSlider
                infos={listaInfos}
                itemWidth={340}
                itemHeight={460}
                gap={24}
                durationSec={20}
                direction="left"
                pauseOnHover
                edgeFade
              />
            </div>
          </div>

          <p className="mx-auto mt-12 max-w-2xl text-center text-sm font-medium text-neutral-500">
            Conheça os times que movem o STEM IME, divididos por áreas
            estratégicas para garantir o melhor impacto educacional e
            tecnológico.
          </p>
        </div>
      </section>
      <div className="relative h-2 w-[110%] bg-blue-400" />

      {/* Fotos em Destaque */}
      <section
        id="images"
        className="flex w-full flex-col items-center gap-6 overflow-x-hidden bg-white px-4 py-12 sm:px-6 lg:px-8"
      >
        <div className="font-sans text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
          Fotos em destaque
        </div>

        <div className="w-full max-w-6xl">
          <ComponentCarousel />
        </div>
      </section>
      <div className="relative h-2 w-[110%] bg-orange-400" />
    </div>
  );
};

export { Index };
