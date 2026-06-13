import styles from "./quem-somos.module.css";

function ImgPlaceholder({ label }: { label: string }) {
  return (
    <div className={styles.imgPlaceholder}>
      {/* <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <span>{label}</span> */}
      <img src={label}/>
    </div>
  );
}

function SectionEyebrow({ prefix, active, cor }: { prefix: string; active: string , cor: string}) {
  return (
    <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400">
      <span>[ {prefix} /</span>
      <span style={{color: cor}}>{active} ]</span>
    </div>
  );
}

export default function QuemSomos() {
  return (
    <div className={styles.qs}>

      {/* ══ INTRO ═════════════════════════════════════════════════════ */}
      <div className={styles.intro}>
        <div>
          {/* <p className={styles.introLabel}>Quem Somos</p> */}
            <SectionEyebrow prefix="Estrutura" active="Quem Somos" cor="orange"/>

          <h2 className={styles.introHeading}>
            Transformando
            <br />a Engenharia
            <br /><em>através da educação</em>
          </h2>
          <p className={styles.introText}>
            A STEM IME é uma iniciativa estudantil do Instituto Militar de
            Engenharia que incentiva meninas a ingressarem em ciência,
            tecnologia, engenharia e matemática — por meio de oficinas,
            mentorias e materiais gratuitos que chegam onde precisam chegar.
          </p>
        </div>

        <div className={styles.introImg}>
          {/*
            <img src="/images/quem-somos/capa.jpg" alt="Meninas em atividade STEM" />
          */}
          <ImgPlaceholder label="images/inicial/img1.jpeg" />
          <div className={styles.badge}>
            <span className={styles.badgeNum}>2018</span>
            <span className={styles.badgeLabel}>Fundação</span>
          </div>
        </div>
      </div>

      {/* ══ STATS ═════════════════════════════════════════════════════ */}
      <div className={styles.stats}>
        {[
          { num: "2018",  bold: false, label: "Ano de fundação"      },
          { num: "IME",   bold: false, label: "Origem institucional" },
          { num: "+7",    bold: true,  label: "Anos de impacto"      },
          { num: "∞",     bold: true,  label: "Meninas alcançadas"   },
        ].map((s) => (
          <div className={styles.statItem} key={s.label}>
            <div className={styles.statNum}>
              {s.bold ? <b>{s.num}</b> : s.num}
            </div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ══ ORIGEM ════════════════════════════════════════════════════ */}
      <div className={styles.origem}>

        {/* mosaico de imagens */}
        <div className={styles.origemImgs}>
            <ImgPlaceholder label="images/inicial/img2.jpg" />
          
        </div>

        {/* texto */}
        <div className={styles.origemContent}>
          {/* <p className={styles.sectionLabel}>Nossa Origem</p> */}
            <SectionEyebrow prefix="História" active="Nossa Origem" cor="blue"/>

          <h3 className={styles.blockHeading}>
            Uma ideia que<br />virou movimento
          </h3>
          <p className={styles.blockText}>
            Nasceu da percepção de alunas do IME sobre a baixa
            representatividade feminina nas carreiras de exatas. A urgência de
            gerar impacto real as levou às escolas públicas — levando oficinas,
            mentorias e atividades que tornaram as ciências acessíveis e
            inspiradoras para centenas de garotas.
          </p>
          <p className={styles.highlight}>
            Hoje somos uma das iniciativas de extensão mais ativas do IME,
            fortalecendo a conexão entre universidade e sociedade.
          </p>
        </div>
      </div>

      {/* ══ OBJETIVOS ═════════════════════════════════════════════════ */}
      <div className={styles.objetivos}>

        {/* texto + pilares */}
        <div className={styles.objetivosContent}>
          <div>
            {/* <p className={styles.sectionLabel}>Objetivos</p> */}
            <SectionEyebrow prefix="Metas" active="Objetivos" cor="blue"/>

            <h3 className={styles.blockHeading}>
              Equidade que<br />forma lideranças
            </h3>
          </div>

          <p className={styles.blockText}>
            Nossa missão é ampliar a participação feminina nas áreas STEM,
            desenvolvendo nossas integrantes enquanto impactamos a sociedade —
            formando lideranças com habilidades reais.
          </p>

          <div className={styles.pillarList}>
            {[
              { n: "01", name: "Protagonismo",  desc: "Desenvolvemos liderança feminina dentro e fora do IME." },
              { n: "02", name: "Colaboração",   desc: "Trabalho em equipe como motor de transformação coletiva." },
              { n: "03", name: "Ciência",       desc: "Educação científica acessível para todo o Brasil." },
              // { n: "04", name: "Inclusão",      desc: "Equidade de gênero como valor inegociável em cada ação." },
            ].map((p) => (
              <div className={styles.pillar} key={p.name}>
                <span className={styles.pillarNum}>{p.n}</span>
                <div className={styles.pillarText}>
                  <p className={styles.pillarName}>{p.name}</p>
                  <p className={styles.pillarDesc}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* imagem com citação */}
        <div className={styles.objetivosImg}>
          {/* <img src="/images/quem-somos/equipe.jpg" alt="Equipe STEM IME" /> */}
          <ImgPlaceholder label="images/inicial/img4.jpeg" />
          <div className={styles.objetivosImgOverlay}>
            <p className={styles.overlayQuote}>
              "Estimulamos protagonismo, comunicação e trabalho em equipe."
            </p>
            <p className={styles.overlayCaption}>STEM IME · desde 2018</p>
          </div>
        </div>
      </div>

    </div>
  );
}