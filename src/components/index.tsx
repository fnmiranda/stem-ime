import ComponentCarousel from "./Home/Carrosel/carousel";
import { Birthstone } from "next/font/google";
import InfiniteImageSlider from "./Home/Carrosel/carousel-test";
import FeaturedPosts from "@/src/components/Home/FeaturedPosts";
import { FaleConosco } from "./fale-conosco";
import QuemSomos from "./quem-somos";
import styles from "./index.module.css"

const birthstone = Birthstone({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-birthstone",
});

const listaInfos = [
  {
    title: "CRESCIMENTO INTERNO",
    src: "https://stemwomen.com.br/ws/alt-imgs/w600/c6f35d23850faefe66b5444858d20bf8.webp",
    alt: "Desenvolvimento",
    content:
      "Responsável pelo desenvolvimento dos integrantes via treinamentos, capacitações e workshops. Abriga o Impacta STEM, núcleo dedicado ao impacto social por meio de parcerias com ONGs e ações voltadas para a sociedade.",
  },
  {
    title: "GESTÃO E FINANCEIRO",
    src: "https://img.freepik.com/fotos-gratis/mulher-gerente-usando-laptop-e-tablet-ao-mesmo-tempo-trabalhando-em-relatorios-financeiros_482257-7704.jpg",
    alt: "Financeiro",
    content:
      "Responsável pela organização interna, gestão de recursos e controle orçamentário da STEM. Também estrutura processos seletivos e organiza imersões, garantindo o bom funcionamento e a sustentabilidade da equipe.",
  },
  {
    title: "MARKETING",
    src: "https://stemwomen.com.br/ws/alt-imgs/w400/47cc0241a1895d631b87e69717f172c9.webp",
    alt: "Marketing",
    content:
      "Responsável pela comunicação da STEM, gerenciando redes sociais como Instagram e LinkedIn, identidade visual e divulgação de ações e projetos, ampliando o alcance e a visibilidade da iniciativa.",
  },
  {
    title: "OFICINAS",
    src: "https://stemwomen.com.br/ws/alt-imgs/w600/430d328837fd0b14bc06e8eb80414102.webp",
    alt: "Oficinas",
    content:
      "Planeja e executa atividades educacionais em escolas e projetos sociais, como Oficinas Científicas e mentorias online para garotas de todo o Brasil, sendo um dos principais meios de impacto da STEM.",
  },
  {
    title: "SISTEMA COLÉGIO MILITAR",
    src: "https://stemwomen.com.br/ws/alt-imgs/w400/03106e6355f3a3a9fe4016c1b121d323.webp",
    alt: "SCM",
    content:
      "Atua na relação com o Sistema Colégio Militar, ampliando o alcance da STEM e apoiando iniciativas como a feira de ciências do Colégio Militar do Rio de Janeiro.",
  },
  {
    title: "EDUCA STEM",
    src: "https://portal.invest.academy/wp-content/uploads/2023/02/MulherMercadoFinanceiro.jpg",
    alt: "EDUCA",
    content:
      "Organiza voluntários para aulas de reforço em colégio parceiro e desenvolve apostilas gratuitas de matemática, física e química para estudantes de todo o Brasil, ampliando o impacto educacional da STEM.",
  },
];

/* ─── Componente de divisor reutilizável ─── */
function Divider({ color }: { color: "orange" | "blue" }) {
  return (
    <div
      aria-hidden="true"
      className={`h-1.5 w-full ${color === "orange" ? "bg-orange-400" : "bg-blue-400"}`}
    />
  );
}

/* ─── Rótulo de seção reutilizável ─── */
function SectionEyebrow({ prefix, active, cor }: { prefix: string; active: string , cor: string}) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
      <span>[ {prefix} /</span>
      <span style={{color: cor}}>{active} ]</span>
    </div>
  );
}

const Index = () => {
  return (
    <div className="flex w-full flex-col items-center overflow-x-hidden">

      {/* ══ HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="relative isolate flex min-h-[58svh] w-full flex-col items-center justify-center gap-6 overflow-hidden px-4 pb-16 pt-10 sm:gap-8 sm:px-6 sm:pb-20 lg:px-8"
        style={{
          backgroundImage:
            "url(fundo-banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 65%",
        }}
      >
        {/* sobreposição */}
        <div className="absolute inset-0 -z-10 bg-black/40" />

        {/* assinatura */}
        <div
          className={`${birthstone.className} relative z-10 text-center italic leading-none text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[clamp(4.5rem,16vw,13rem)]`}
        >
          girls to girls
        </div>

        {/* citação */}
        <div className="flex flex-col items-center gap-2 justify-center opacity-40 hover:opacity-100">
          <blockquote className="relative z-10 w-full max-w-xl rounded-2xl bg-black/35 px-5 py-4 text-center text-sm italic text-white shadow-lg backdrop-blur-sm sm:text-base">
            <p className="mb-1">"Não há limites para o que nós, como mulheres, podemos realizar"</p>
            <footer className="font-semibold not-italic text-orange-300">— Michelle Obama</footer>
          </blockquote>

          {/* descrição */}
          <p className="relative z-10 w-full max-w-2xl rounded-2xl bg-black/35 px-5 py-4 text-center text-sm leading-relaxed text-white/90 shadow-lg backdrop-blur-sm sm:text-base">
            Somos uma Iniciativa Estudantil do{" "}
            <strong className="font-semibold text-white">
              Instituto Militar de Engenharia (IME)
            </strong>{" "}
            que objetiva estimular a participação feminina nas carreiras das áreas de
            ciências, tecnologia, engenharia e matemática (STEM) e, assim, contribuir
            para o fomento da diversidade no mercado de trabalho.
          </p>

        </div>
      </section>

      <Divider color="blue" />

      {/* ══ POSTAGENS EM DESTAQUE ══════════════════════════════════════════ */}
      <section className="w-full bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">

          <div className="flex flex-col items-center gap-3 text-center">
            <SectionEyebrow cor="blue" prefix="Blog" active="Destaques" />
            {/* <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              Postagens em Destaque
            </h2> */}
            <h2 className={styles.introHeading}>
              Postagens em <em className="text-blue-500">destaque</em>
            </h2>
            <div className="h-1 w-12 rounded-full bg-blur-400" />
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            <FeaturedPosts limit={3} />
          </div>
        </div>
      </section>

      <Divider color="orange" />

      {/* ══ QUEM SOMOS ════════════════════════════════════════════════════ */}
      <section
        id="quem-somos"
        className="w-full bg-linear-to-b from-orange-100 via-orange-50 to-blue-100 px-4 sm:px-6 sm:py-20 lg:px-8"
      >
        <QuemSomos />
      </section>

      <Divider color="blue" />

      {/* ══ NOSSAS DIRETORIAS ══════════════════════════════════════════════ */}
      <section className="w-full overflow-hidden bg-neutral-50 px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">

          <div className="flex flex-col items-center gap-3 text-center">
            <SectionEyebrow prefix="Estrutura" active="Equipe" cor="blue"/>
            {/* <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              Nossas Diretorias
            </h2> */}
            <h2 className={styles.introHeading}>
              Nossas  <em className="text-blue-500">diretorias</em>
            </h2>
            <div className="h-1 w-12 rounded-full bg-blue-600" />
          </div>

          <div className="w-full rounded-2xl bg-white/60 p-3 shadow-sm backdrop-blur-sm lg:p-4">
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

          <p className="max-w-2xl text-center text-sm font-medium text-neutral-500">
            Conheça os times que movem o STEM IME, divididos por áreas estratégicas
            para garantir o melhor impacto educacional e tecnológico.
          </p>
        </div>
      </section>

      <Divider color="orange" />

      {/* ══ FOTOS EM DESTAQUE ══════════════════════════════════════════════ */}
      <section
        id="images"
        className="w-full bg-white px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
      >
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-10">

          <div className="flex flex-col items-center gap-3 text-center">
            <SectionEyebrow prefix="Galeria" active="Fotos" cor="orange"/>
            {/* <h2 className="text-3xl font-extrabold tracking-tight text-neutral-950 sm:text-4xl lg:text-5xl">
              Fotos em Destaque
            </h2> */}
            <h2 className={styles.introHeading}>
              Fotos em <em className="text-orange-500">destaque</em>
            </h2>
            <div className="h-1 w-12 rounded-full bg-orange-400" />
          </div>

          <div className="w-full">
            <ComponentCarousel />
          </div>
        </div>
      </section>

      {/* ══ FALE CONOSCO ════════════════════════════════════════════════== */}
      {/* <section className="flex w-full">
        <FaleConosco />
      </section> */}

      <Divider color="blue" />
    </div>
  );
};

export { Index };
