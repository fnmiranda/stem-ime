import styles from "./fale-conosco.module.css";

const FaleConosco = () => {
  const channels = [
    { icon: "📸", label: "Instagram" },
    { icon: "▶️", label: "YouTube"   },
    { icon: "💼", label: "LinkedIn"  },
    { icon: "✉️", label: "E-mail"    },
  ];

  return (
    <div className={styles.wrapper}>
      {/* Coluna esquerda: canais */}
      <div className={styles.channels}>
        <p className={styles.channelsLabel}>Siga em outros canais</p>
        {channels.map(({ icon, label }) => (
          <a key={label} className={styles.channelLink} href="#">
            <span className={styles.channelIcon}>{icon}</span>
            {label}
          </a>
        ))}
      </div>

      {/* Divisor */}
      {/* <div className={styles.divider} />l */}

      {/* Coluna direita: formulário */}
      <div className={styles.formCol}>
        <h2 className={styles.heading}>
          Entre em contato com a{" "}
          <em>STEM IME</em>
        </h2>
        <p className={styles.subheading}>
          Descubra oportunidades de crescimento, networking e mentoria para
          impulsionar sua carreira STEM no Brasil. Faça parte da nossa rede
          de talentos e inovação!
        </p>

        <div className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Nome</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Seu nome completo"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>E-mail</label>
            <input
              className={styles.input}
              type="email"
              placeholder="seu@email.com"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Mensagem</label>
            <textarea
              className={`${styles.input} ${styles.textarea}`}
              placeholder="Como podemos ajudar?"
            />
          </div>

          <div className={styles.captcha}>
            <div className={styles.captchaBox} />
            <span className={styles.captchaLabel}>Não sou um robô</span>
          </div>

          <div className={styles.submitRow}>
            <button className={styles.submitBtn}>
              Enviar mensagem →
            </button>
            <span className={styles.submitNote}>Respondemos em até 48h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { FaleConosco };