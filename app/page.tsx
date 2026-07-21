"use client";

import { FormEvent, useState } from "react";

type Package = {
  name: string;
  subtitle: string;
  price: string;
  ideal: string;
  highlights: string[];
  includes: string[];
  featured?: boolean;
};

const packages: Package[] = [
  {
    name: "Essencial",
    subtitle: "Nascer com Segurança",
    price: "R$ 1.190",
    ideal:
      "Para gestantes que já têm uma boa rede de apoio e desejam segurança e acolhimento profissional no parto.",
    highlights: [
      "1 encontro pré-parto",
      "Plantão 24h desde a 38ª semana",
      "Suporte por 7 dias após o nascimento",
    ],
    includes: [
      "1 encontro pré-parto presencial ou online",
      "Orientações sobre sinais do trabalho de parto",
      "Preparação emocional para o nascimento",
      "Elaboração de um plano de parto simplificado",
      "Orientações sobre posições, respiração e movimentação",
      "Suporte pelo WhatsApp durante a gestação",
      "Plantão de disponibilidade 24 horas a partir da 38ª semana",
      "Acompanhamento contínuo durante o trabalho de parto",
      "Presença durante o parto normal ou cesárea, conforme autorização da maternidade",
      "Técnicas não farmacológicas para conforto e alívio da dor",
      "Acompanhamento durante o pós-parto imediato",
      "Suporte remoto durante os primeiros 7 dias após o nascimento",
    ],
  },
  {
    name: "Completo",
    subtitle: "Jornada do Nascimento",
    price: "R$ 1.690",
    ideal:
      "Para mães de primeira viagem e famílias que desejam preparação mais completa, do pré-parto ao puerpério.",
    highlights: [
      "2 encontros pré-parto presenciais",
      "1 visita puerperal",
      "Suporte por 15 dias após o nascimento",
    ],
    includes: [
      "2 encontros pré-parto presenciais",
      "Orientações sobre gestação, parto e pós-parto",
      "Elaboração personalizada do plano de parto",
      "Preparação do acompanhante para participar do trabalho de parto",
      "Treinamento de posições, massagens, respiração e vocalização",
      "Orientações sobre intervenções e rotinas da maternidade",
      "Suporte pelo WhatsApp durante toda a gestação",
      "Plantão de disponibilidade 24 horas a partir da 37ª semana",
      "Acompanhamento contínuo durante o trabalho de parto e nascimento",
      "Técnicas não farmacológicas para conforto e alívio da dor",
      "Apoio emocional à gestante e ao acompanhante",
      "Acompanhamento no pós-parto imediato",
      "1 visita puerperal presencial",
      "Apoio inicial à amamentação dentro do escopo da doulagem",
      "Suporte remoto por até 15 dias após o parto",
    ],
    featured: true,
  },
  {
    name: "Premium",
    subtitle: "Maternidade Acolhida 360°",
    price: "R$ 2.390",
    ideal:
      "Para famílias que desejam acompanhamento próximo, exclusivo e prolongado em toda a jornada.",
    highlights: [
      "4 encontros pré-parto presenciais",
      "2 visitas puerperais",
      "Suporte por 30 dias após o nascimento",
    ],
    includes: [
      "4 encontros pré-parto presenciais",
      "Acompanhamento personalizado durante a gestação",
      "Plano de parto completo",
      "Plano de pós-parto e organização da rede de apoio",
      "Preparação individual da gestante e do acompanhante",
      "Simulação das fases do trabalho de parto",
      "Orientações sobre posições, massagens, respiração e métodos de conforto",
      "Orientações para organização da mala e preparação para a maternidade",
      "Suporte prioritário pelo WhatsApp",
      "Plantão de disponibilidade 24 horas a partir da 36ª semana",
      "Acompanhamento contínuo durante o trabalho de parto e nascimento",
      "Apoio em parto normal, indução ou cesárea",
      "Presença durante o pós-parto imediato",
      "2 visitas puerperais presenciais",
      "Apoio inicial à amamentação e adaptação da família",
      "Orientações sobre cuidados básicos e organização da rotina com o bebê",
      "Acolhimento emocional durante o puerpério",
      "Suporte remoto por até 30 dias após o nascimento",
    ],
  },
];

const extras = [
  ["Encontro pré-parto adicional", "R$ 180"],
  ["Visita puerperal adicional", "R$ 250"],
  ["Consultoria para elaboração do plano de parto", "R$ 250"],
  ["Preparação individual do acompanhante", "R$ 180"],
  ["Acompanhamento remoto da gestação", "R$ 350"],
  ["Deslocamento para outras cidades", "Calculado separadamente"],
];

const faqs = [
  {
    question: "A doula acompanha parto normal e cesárea?",
    answer:
      "Sim. O acompanhamento pode acontecer no parto normal, na indução ou na cesárea, sempre conforme a autorização e as regras da maternidade.",
  },
  {
    question: "A doula substitui a equipe de saúde?",
    answer:
      "Não. A doula oferece apoio físico, emocional e informacional. Ela não realiza exames, diagnósticos, procedimentos médicos ou de enfermagem, não administra medicamentos e não interfere nas decisões técnicas da equipe de saúde.",
  },
  {
    question: "Quando começa o plantão de disponibilidade?",
    answer:
      "Na 38ª semana no Pacote Essencial, na 37ª semana no Completo e na 36ª semana no Premium. A forma de acionamento é combinada e registrada no contrato.",
  },
  {
    question: "O acompanhante também recebe orientação?",
    answer:
      "Sim. Os pacotes Completo e Premium incluem preparação do acompanhante para que ele participe com mais confiança do trabalho de parto.",
  },
  {
    question: "Há acompanhamento depois do nascimento?",
    answer:
      "Sim. O suporte remoto é de 7 dias no Essencial, 15 dias no Completo e 30 dias no Premium. Os pacotes Completo e Premium também incluem uma e duas visitas puerperais, respectivamente.",
  },
  {
    question: "E se o parto for muito rápido ou houver uma emergência?",
    answer:
      "As condições para parto muito rápido, substituição da doula, cancelamento e devolução são explicadas com clareza e formalizadas no contrato antes do início do acompanhamento.",
  },
];

function formatWhatsApp(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [firstName, setFirstName] = useState("");

  function choosePackage(packageName: string) {
    setSelectedPackage(packageName);
    setStatus("idle");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    setFirstName(name.split(/\s+/)[0] ?? "");
    setStatus("sending");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          city: formData.get("city"),
          whatsapp: formData.get("whatsapp"),
          pregnancyWeeks: formData.get("pregnancyWeeks"),
          packageInterest: selectedPackage || null,
          consent: formData.get("consent") === "on",
          website: formData.get("website"),
        }),
      });

      if (!response.ok) throw new Error("Não foi possível enviar");
      setStatus("success");
      form.reset();
      setWhatsapp("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main>
      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#inicio" aria-label="Cynthia Nicole — início">
            <span className="brand-mark" aria-hidden="true">CN</span>
            <span className="brand-copy">
              <strong>Cynthia Nicole</strong>
              <small>Enfermeira • Especialista em Doulagem</small>
            </span>
          </a>
          <nav aria-label="Navegação principal">
            <a href="#como-funciona">Como funciona</a>
            <a href="#pacotes">Pacotes</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
          <a className="button button-small button-outline" href="#contato">
            Quero conversar
          </a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span /> Acompanhamento antes, durante e depois do parto</p>
            <h1>
              O nascimento pode ser vivido com mais <em>preparo, presença e acolhimento.</em>
            </h1>
            <p className="hero-lead">
              Cynthia Nicole oferece apoio físico, emocional e informacional para você e sua família atravessarem a gestação, o parto e o puerpério com escolhas mais conscientes e suporte contínuo.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#contato">
                Quero conversar com a Cynthia <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#pacotes">Conhecer os pacotes <span aria-hidden="true">↓</span></a>
            </div>
            <ul className="trust-list" aria-label="Diferenciais do acompanhamento">
              <li>Parto normal ou cesárea</li>
              <li>Plantão de disponibilidade 24h</li>
              <li>Suporte presencial e online</li>
            </ul>
          </div>

          <div className="hero-visual" aria-label="A jornada de acompanhamento">
            <div className="hero-seal"><span>cuidado</span><strong>360°</strong></div>
            <div className="care-card">
              <div className="care-card-top">
                <span>Uma presença contínua</span>
                <span className="soft-pill">da gestação ao puerpério</span>
              </div>
              <div className="journey-list">
                <div className="journey-item">
                  <span className="journey-number">01</span>
                  <div><strong>Preparar</strong><p>Informação clara, plano de parto e recursos práticos.</p></div>
                </div>
                <div className="journey-item">
                  <span className="journey-number">02</span>
                  <div><strong>Acompanhar</strong><p>Presença contínua, conforto e apoio emocional.</p></div>
                </div>
                <div className="journey-item">
                  <span className="journey-number">03</span>
                  <div><strong>Acolher</strong><p>Suporte no pós-parto e adaptação da família.</p></div>
                </div>
              </div>
              <blockquote>
                “Seu corpo, suas escolhas, seu ritmo — com informação e acolhimento.”
              </blockquote>
            </div>
            <div className="credential-card">
              <span className="credential-mark" aria-hidden="true">CN</span>
              <div><strong>Cynthia Nicole</strong><small>Enfermeira especialista em Doulagem</small></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section benefits-section" id="como-funciona">
        <div className="container">
          <div className="section-heading centered-heading">
            <p className="eyebrow eyebrow-centered"><span /> Apoio que respeita o seu caminho <span /></p>
            <h2>Informação para decidir.<br /><em>Presença para acolher.</em></h2>
            <p>A doulagem apoia você antes, durante e depois do nascimento, respeitando suas necessidades e o trabalho da equipe de saúde.</p>
          </div>
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="card-index">01</span>
              <div className="benefit-icon" aria-hidden="true">✦</div>
              <h3>Preparação com clareza</h3>
              <p>Entenda as fases do trabalho de parto, organize suas preferências e chegue ao nascimento mais informada.</p>
            </article>
            <article className="benefit-card featured-benefit">
              <span className="card-index">02</span>
              <div className="benefit-icon" aria-hidden="true">◌</div>
              <h3>Conforto e presença</h3>
              <p>Respiração, massagens, posições e movimentação para favorecer conforto, foco e acolhimento durante o parto.</p>
            </article>
            <article className="benefit-card">
              <span className="card-index">03</span>
              <div className="benefit-icon" aria-hidden="true">⌁</div>
              <h3>Apoio para a família</h3>
              <p>Orientação para o acompanhante e suporte no puerpério, ajudando a família a viver a transição com mais cuidado.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section about-section">
        <div className="container about-grid">
          <div className="about-portrait" aria-hidden="true">
            <span className="portrait-ring portrait-ring-one" />
            <span className="portrait-ring portrait-ring-two" />
            <span className="portrait-monogram">CN</span>
            <span className="portrait-caption">Enfermagem + Doulagem</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow"><span /> Quem vai caminhar com você</p>
            <h2>Cynthia Nicole</h2>
            <p className="about-role">Enfermeira • Especialista em Doulagem</p>
            <p className="about-intro">
              Um acompanhamento construído com escuta, informação acessível e recursos práticos de conforto — para que você se sinta amparada sem perder o protagonismo das suas escolhas.
            </p>
            <div className="scope-note">
              <span aria-hidden="true">i</span>
              <p><strong>O papel da doula é complementar.</strong> Cynthia oferece apoio físico, emocional e informacional e atua em parceria respeitosa com a equipe de saúde.</p>
            </div>
            <a className="text-link strong-link" href="#contato">Conte um pouco sobre a sua gestação <span aria-hidden="true">→</span></a>
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><p className="eyebrow"><span /> Passo a passo</p><h2>Como começa o seu <em>acompanhamento</em></h2></div>
            <p>Uma conversa inicial ajuda a entender o seu momento, suas necessidades e qual formato de cuidado faz sentido para a sua família.</p>
          </div>
          <ol className="process-grid">
            <li><span>01</span><strong>Você envia seus dados</strong><p>Preencha o formulário com seu nome, cidade, WhatsApp e semanas de gestação.</p></li>
            <li><span>02</span><strong>Cynthia entra em contato</strong><p>Vocês conversam sobre seu momento e as expectativas para o acompanhamento.</p></li>
            <li><span>03</span><strong>Escolhem o pacote</strong><p>O formato ideal e todas as condições ficam claros antes da contratação.</p></li>
            <li><span>04</span><strong>A jornada começa</strong><p>Encontros, orientações e suporte seguem o plano escolhido pela família.</p></li>
          </ol>
        </div>
      </section>

      <section className="section packages-section" id="pacotes">
        <div className="container">
          <div className="section-heading centered-heading packages-heading">
            <p className="eyebrow eyebrow-centered"><span /> Escolha o cuidado que combina com você <span /></p>
            <h2>Pacotes de <em>acompanhamento</em></h2>
            <p>Três formas de ter preparo, presença e acolhimento — do essencial ao acompanhamento mais próximo e prolongado.</p>
          </div>
          <div className="package-grid">
            {packages.map((item) => (
              <article className={`package-card ${item.featured ? "featured-package" : ""}`} key={item.name}>
                {item.featured && <span className="popular-badge">Mais escolhido</span>}
                <div className="package-topline"><span>Pacote {item.name}</span><span>{item.featured ? "◉" : "○"}</span></div>
                <h3>{item.subtitle}</h3>
                <div className="price"><small>Investimento</small><strong>{item.price}</strong></div>
                <p className="package-ideal">{item.ideal}</p>
                <ul className="package-highlights">
                  {item.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <details className="package-details">
                  <summary>Ver tudo o que está incluído <span aria-hidden="true">+</span></summary>
                  <ul>{item.includes.map((included) => <li key={included}>{included}</li>)}</ul>
                </details>
                <a
                  className={`button ${item.featured ? "button-light" : "button-card"}`}
                  href="#contato"
                  onClick={() => choosePackage(`Pacote ${item.name}`)}
                >
                  Quero saber se é para mim <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>

          <div className="extras-card">
            <div className="extras-intro">
              <p className="eyebrow"><span /> Personalize sua jornada</p>
              <h3>Serviços adicionais</h3>
              <p>Itens que podem complementar o pacote escolhido conforme as necessidades da sua família.</p>
            </div>
            <div className="extras-list">
              {extras.map(([service, price]) => (
                <div className="extra-row" key={service}><span>{service}</span><strong>{price}</strong></div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section transparency-section">
        <div className="container transparency-grid">
          <div>
            <p className="eyebrow light-eyebrow"><span /> Transparência desde o primeiro encontro</p>
            <h2>Você sabe como tudo funciona <em>antes da jornada começar.</em></h2>
            <p className="transparency-lead">O contrato registra com clareza os combinados do acompanhamento, protegendo você, sua família e a profissional.</p>
          </div>
          <ul className="transparency-list">
            <li>Início do plantão e forma de acionar a doula</li>
            <li>Doula substituta em caso de emergência</li>
            <li>Regras de cancelamento e devolução</li>
            <li>Deslocamentos e atendimento em outras cidades</li>
            <li>Conduta em caso de parto muito rápido</li>
            <li>Acompanhamento em parto normal ou cesárea</li>
          </ul>
        </div>
        <div className="container clinical-boundary">
          <strong>A doula não substitui a equipe assistencial.</strong>
          <p>Ela não realiza exames, diagnósticos, procedimentos médicos ou de enfermagem, não administra medicamentos e não interfere nas decisões técnicas da equipe de saúde.</p>
        </div>
      </section>

      <section className="section faq-section" id="duvidas">
        <div className="container faq-grid">
          <div className="faq-heading">
            <p className="eyebrow"><span /> Dúvidas frequentes</p>
            <h2>Informação também é uma forma de <em>cuidado.</em></h2>
            <p>Se sua dúvida não estiver aqui, deixe seus dados no formulário. Cynthia poderá conversar com você sobre o seu momento.</p>
            <a className="text-link strong-link" href="#contato">Quero tirar uma dúvida <span aria-hidden="true">→</span></a>
          </div>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <details key={faq.question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{faq.question}<b aria-hidden="true">+</b></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact-section" id="contato">
        <div className="container contact-grid">
          <div className="contact-copy">
            <p className="eyebrow light-eyebrow"><span /> Vamos conversar?</p>
            <h2>Conte um pouco sobre a sua <em>gestação.</em></h2>
            <p>Preencha seus dados para receber contato pelo WhatsApp e entender qual acompanhamento combina com o seu momento.</p>
            <ul>
              <li>Uma conversa acolhedora e objetiva</li>
              <li>Orientação sobre os pacotes disponíveis</li>
              <li>Seus dados usados somente para este contato</li>
            </ul>
            <blockquote>“Cada nascimento tem sua própria história. O cuidado começa por escutar a sua.”</blockquote>
          </div>

          <div className="form-card">
            {status === "success" ? (
              <div className="success-state" role="status">
                <span aria-hidden="true">✓</span>
                <p className="eyebrow">Mensagem recebida</p>
                <h3>Obrigada, {firstName || "mamãe"}.</h3>
                <p>Seu interesse foi registrado com segurança. Cynthia poderá entrar em contato pelo WhatsApp informado.</p>
                <button className="text-link strong-link" type="button" onClick={() => setStatus("idle")}>Enviar outro contato <span aria-hidden="true">→</span></button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-heading">
                  <span>Primeiro contato</span>
                  <strong>Leva menos de 1 minuto</strong>
                </div>
                {selectedPackage && <p className="selected-package">Interesse atual: <strong>{selectedPackage}</strong></p>}
                <div className="field-grid">
                  <label>
                    <span>Nome</span>
                    <input name="name" type="text" autoComplete="name" placeholder="Como podemos chamar você?" minLength={2} maxLength={100} required />
                  </label>
                  <label>
                    <span>Cidade</span>
                    <input name="city" type="text" autoComplete="address-level2" placeholder="Em qual cidade você mora?" minLength={2} maxLength={100} required />
                  </label>
                  <label>
                    <span>WhatsApp com DDD</span>
                    <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" value={whatsapp} onChange={(event) => setWhatsapp(formatWhatsApp(event.target.value))} minLength={14} required />
                  </label>
                  <label>
                    <span>Semanas de gestação</span>
                    <input name="pregnancyWeeks" type="number" inputMode="numeric" placeholder="Ex.: 28" min={1} max={42} required />
                  </label>
                </div>
                <label className="honeypot" aria-hidden="true">
                  Website
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </label>
                <label className="consent-field">
                  <input name="consent" type="checkbox" required />
                  <span>Ao enviar, concordo em receber contato pelo WhatsApp sobre os serviços de doulagem.</span>
                </label>
                {status === "error" && <p className="form-error" role="alert">Não foi possível enviar agora. Confira os dados e tente novamente em instantes.</p>}
                <button className="button button-submit" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Enviando..." : "Quero receber contato no WhatsApp"}
                  {status !== "sending" && <span aria-hidden="true">→</span>}
                </button>
                <p className="privacy-note">Seus dados são armazenados com acesso restrito e não serão compartilhados com terceiros.</p>
              </form>
            )}
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#inicio">
            <span className="brand-mark" aria-hidden="true">CN</span>
            <span className="brand-copy"><strong>Cynthia Nicole</strong><small>Enfermeira • Especialista em Doulagem</small></span>
          </a>
          <p>Apoio físico, emocional e informacional durante a gestação, o parto e o puerpério.</p>
          <a href="#inicio" className="back-to-top" aria-label="Voltar ao início">↑</a>
        </div>
        <div className="container footer-bottom"><span>© 2026 Cynthia Nicole. Todos os direitos reservados.</span><span>Doulagem não substitui assistência médica ou de enfermagem.</span></div>
      </footer>

      <a className="mobile-cta" href="#contato">Quero conversar <span aria-hidden="true">→</span></a>
    </main>
  );
}
