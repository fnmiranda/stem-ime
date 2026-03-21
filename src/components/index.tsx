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
        className="relative flex w-full flex-col items-center gap-8 overflow-hidden px-4 pb-0 pt-4 sm:gap-10 sm:px-6 lg:px-8"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: "url(/oficial-background.jpg)"
        }}
      >
       <div className="absolute inset-0 bg-linear-to-r from-[#040607]/25 from-20% via-[#040607]/85 via-40% to-[#040607]/25 to-90%"/>


        <div
          className={`${birthstone.className} relative mt-2 text-center italic leading-none text-[clamp(4rem,14vw,12.5rem)]`}
        >
          girls to girls
        </div>

        <div className=" relative max-w-3xl px-2 text-center text-sm italic sm:text-base">
          “Não há limites para o que nós, como mulheres, podemos realizar”
          <p className="mt-2">Michelle Obama</p>
        </div>

        <div className=" relative w-full max-w-3xl px-2 text-center italic text-normal opacity-85 max-sm:text-xs">
          Somos uma Iniciativa Estudantil do Instituto Militar de Engenharia
          (IME) que objetiva estimular a participação feminina nas carreiras das
          áreas de ciências, tecnologia, engenharia e matemática (STEM) e,
          assim, contribuir para o fomento da diversidade no mercado de trabalho
          e para o suprimento da crescente demanda profissional nessa área.
        </div>

        <div className=" relative h-2 w-[110%] bg-blue-400" />
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
        <div className=" relative h-2 w-[110%] bg-orange-400" />


      {/* Quem Somos */}
      <section
        id="quem-somos"
        className="w-full bg-white py-16 text-neutral-900 sm:py-20 lg:py-24 font-sans"
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
          <p className="mb-16 text-left max-w-9xl text-lg leading-relaxed text-neutral-600 lg:mb-24">
            O STEM IME é um grupo de extensão do Instituto Militar de Engenharia dedicado a incentivar jovens talentos, com foco especial na equidade de gênero nas ciências e tecnologias. Nascido da colaboração com o STEM2D (ITA), nosso projeto revoluciona o ensino de exatas através de oficinas práticas, unindo <span className="text-blue-600">excelência acadêmica</span> e <span className="text-orange-600">impacto social</span> para construir o futuro da engenharia brasileira.
          </p>



          {/* Seção: Nossa Origem (Layout com imagem à direita) */}
          <div className="mb-24 flex flex-col gap-12 lg:mb-32 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-extrabold text-neutral-950 lg:text-4xl">Nossa Origem</h3>
              <p className="text-base leading-relaxed text-neutral-600">
                Tudo começou com a troca de experiências com a iniciativa STEM2D do ITA. Em nosso primeiro ano, realizamos oficinas semanais no IME, levando conhecimento prático e teórico para alunos da rede pública do Rio de Janeiro.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3 text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Oficinas práticas semanais no Instituto Militar de Engenharia.</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Integração entre estudantes civis e militares para mentoria.</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">✓</span>
                  <span>Foco no desenvolvimento de soft skills e raciocínio lógico.</span>
                </li>
              </ul>
            </div>
            
            {/* Container de Imagem Estilo "Renovex" */}
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
                    className="h-full w-full object-cover bg-white"
                    alt="Logo STEM detalhe"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Seção: Reconhecimento (Layout Invertido) */}
          <div className="flex flex-col-reverse gap-12 lg:flex-row-reverse lg:items-center lg:gap-16">
            <div className="flex-1 space-y-6">
              <h3 className="text-3xl font-extrabold text-neutral-950 lg:text-4xl">Reconhecimento Nacional</h3>
              <p className="text-base leading-relaxed text-neutral-600">
                Em 2020, consolidamos nossa atuação ao sermos selecionados para o I Simpósio Brasileiro de Mulheres em STEM no ITA. Entre 182 submissões, nosso trabalho foi destaque, reforçando o compromisso do IME com a rede nacional de incentivo às ciências.
              </p>
              <ul className="space-y-4 pt-4">
                <li className="flex items-start gap-3 text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">✓</span>
                  <span>Apresentação oral entre os 32 melhores projetos do país.</span>
                </li>
                <li className="flex items-start gap-3 text-neutral-800">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600 font-bold text-xs">✓</span>
                  <span>Consolidação na rede nacional de incentivo às mulheres em STEM.</span>
                </li>
              </ul>
            </div>

            {/* Container de Imagem Estilo "Renovex" Invertido */}
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
        <div className=" relative h-2 w-[110%] bg-blue-400" />
      

      {/* Diretoria */}
     <section className="w-full overflow-hidden bg-neutral-50 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          
          {/* Cabeçalho da Seção (Seguindo o padrão Renovex/STEM) */}
          <div className="mb-12 flex flex-col items-center gap-3 text-center lg:mb-16">
            <div className="flex gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-400">
              <span>[ Estrutura /</span>
              <span className="text-blue-600">Equipe ]</span>
            </div>
            <h2 className="font-sans text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
              Nossas Diretorias
            </h2>
            <div className="mt-4 h-1 w-20 rounded-full bg-blue-600 mx-auto" /> 
          </div>

          {/* Container do Slider */}
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

          {/* Texto de Apoio Opcional */}
          <p className="mt-12 text-center text-sm font-medium text-neutral-500 max-w-2xl mx-auto">
            Conheça os times que movem o STEM IME, divididos por áreas estratégicas 
            para garantir o melhor impacto educacional e tecnológico.
          </p>
        </div>
      </section>
        <div className=" relative h-2 w-[110%] bg-blue-400" />


      {/* Fotos em Destaque */}
      <section id="images"
        className="flex w-full flex-col items-center gap-6 overflow-x-hidden bg-white px-4 py-12 sm:px-6 lg:px-8">
        <div className="font-sans text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl lg:text-6xl">
          Fotos em destaque
        </div>

        <div className="w-full max-w-6xl">
          <ComponentCarousel />
        </div>
      </section>
        <div className=" relative h-2 w-[110%] bg-orange-400" />

    </div>
  );
};

export { Index };