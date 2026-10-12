/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  CONTEÚDO DO PORTFÓLIO — JONATHAS GIRARDI
 * ─────────────────────────────────────────────────────────────────────────────
 *  Preenchido com os dados reais do currículo de Jonathas Girardi.
 *  Edite este arquivo sempre que quiser atualizar projetos, experiências
 *  ou competências.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/* ──────────────────────────────── Tipos ──────────────────────────────── */

export type ProjectLinks = {
  /** URL da demonstração ao vivo. Omita se não existir. */
  demo?: string;
  /** URL do repositório. Omita se for privado/inexistente. */
  repo?: string;
};

export type Project = {
  slug: string;
  title: string;
  period: string;
  kind: string;
  summary: string;
  context: string;
  goal: string;
  contribution: string;
  stack: string[];
  results: string[];
  links: ProjectLinks;
  image?: { src: string; alt: string };
};

export type TimelineEntry = {
  title: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
};

export type SkillGroup = {
  name: string;
  description?: string;
  items: string[];
};

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "mail" | "phone";
};

/* ──────────────────────────────── Perfil ─────────────────────────────── */

export const profile = {
  name: "Jonathas Girardi",
  shortName: "Jonathas Girardi",
  initials: "JG",
  role: "Engenharia de Software · Desenvolvedor Full Stack",
  tagline:
    "Desenvolvedor Full Stack focado em plataformas SaaS multi-tenant, interfaces modernas em React e TypeScript, arquiteturas backend assíncronas com Python e FastAPI e automação em nuvem.",
  location: "Feira de Santana, BA",
  phone: "(75) 98293-1661",
  availability: "Disponível para oportunidades como Desenvolvedor Full Stack",
  email: "jonathasgirard@gmail.com",
  seoDescription:
    "Portfólio de Jonathas Girardi — Engenharia de Software e Desenvolvimento Full Stack (React, TypeScript, Python, FastAPI), projetos SaaS, automação em nuvem e contato.",
} as const;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Jntgirardi",
    handle: "@Jntgirardi",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/jonathasgirardi-jr/",
    handle: "in/jonathasgirardi-jr",
    icon: "linkedin",
  },
  {
    label: "E-mail",
    href: "mailto:jonathasgirard@gmail.com",
    handle: "jonathasgirard@gmail.com",
    icon: "mail",
  },
  {
    label: "Telefone",
    href: "tel:+5575982931661",
    handle: "(75) 98293-1661",
    icon: "phone",
  },
];

/* ──────────────────────────────── Sobre ──────────────────────────────── */

export const about = {
  lead: "Graduando em Engenharia de Software (5º semestre) na UNIFAN, construindo aplicações Full Stack completas — de interfaces modernas a backends assíncronos, plataformas SaaS e automações em nuvem.",
  paragraphs: [
    "Atuo no desenvolvimento Full Stack com foco em TypeScript, React.js, Python (FastAPI, Flask) e Java (Spring Boot) — integrando interfaces responsivas a APIs REST assíncronas, modelagem relacional e NoSQL (PostgreSQL, MongoDB) e camadas de cache com Redis.",
    "Minha trajetória profissional na Pirelli (Laboratório MIQ) e na Gefpel consolidou uma base prática em integridade de dados, operação de sistemas corporativos SAP, controle lógico de inventário e acompanhamento de indicadores de qualidade (KPIs).",
    "Busco criar produtos digitais completos e confiáveis que eliminam processos manuais repetitivos, aplicando Clean Architecture, containers Docker, testes automatizados (pytest), pipelines CI/CD e deploy em nuvem.",
  ],
  facts: [
    { label: "Base", value: "Feira de Santana, BA" },
    { label: "Graduação", value: "Eng. de Software · 5º sem (UNIFAN)" },
    { label: "Atuação", value: "Desenvolvedor Full Stack & SaaS" },
    { label: "Idiomas", value: "Inglês Intermediário · Espanhol Básico" },
  ],
};

/* ─────────────────────────────── Projetos ────────────────────────────── */

export const projects: Project[] = [
  {
    slug: "estroque",
    title: "Estroque",
    period: "SaaS · Multi-tenant",
    kind: "Gestão de Estoque e Varejo",
    summary:
      "Plataforma SaaS multi-tenant para centralização de inventário em redes varejistas, com controle unificado de múltiplos estoques por filial, faturamento e relatórios sob Clean Architecture.",
    context:
      "Redes varejistas com múltiplas unidades enfrentavam inconsistências de inventário e descentralização de informações entre filiais.",
    goal: "Centralizar os dados operacionais e eliminar divergências de estoque com controle unificado por filial, faturamento e geração de relatórios.",
    contribution:
      "Estruturação de backend assíncrono em FastAPI sob Clean Architecture, modelagem relacional persistente com PostgreSQL e SQLAlchemy, mensageria com Redis, conteinerização via Docker e frontend em React.js com TypeScript.",
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "SQLAlchemy",
      "Docker",
      "Redis",
      "React.js",
      "TypeScript",
    ],
    results: [
      "Controle unificado de múltiplos estoques por filial em arquitetura multi-tenant.",
      "Backend assíncrono com persistência relacional, mensageria Redis e isolamento em containers Docker.",
      "Código desacoplado e testável estruturado sob os princípios de Clean Architecture.",
    ],
    links: {
      repo: "https://github.com/leooSsou/Estroque",
    },
  },
  {
    slug: "controller-arena",
    title: "ControllerArena",
    period: "Projeto Ativo",
    kind: "Gestão de Torneios e-Sports",
    summary:
      "Plataforma para automação completa de torneios de e-Sports, viabilizando chaveamento dinâmico de partidas, inscrições de times e atualizações em tempo real de baixa latência.",
    context:
      "O gerenciamento manual de competições gerava gargalos na organização de chaves, validação de inscrições e publicação de resultados das partidas.",
    goal: "Automatizar a operação de torneios com chaveamento dinâmico, inscrições de equipes e processamento em tempo real com baixa latência.",
    contribution:
      "Desenvolvimento do backend em Python e FastAPI, modelagem de banco NoSQL flexível no MongoDB para esquemas dinâmicos de torneios e implementação de camada de cache em memória de alta performance com Redis e Docker.",
    stack: ["Python", "FastAPI", "MongoDB", "Redis", "Docker"],
    results: [
      "Automação do chaveamento dinâmico de partidas e fluxo de inscrição de equipes.",
      "Atualizações de placares e chaves em tempo real com baixa latência via cache em memória (Redis).",
      "Esquemas dinâmicos em MongoDB adaptáveis a diferentes formatos de competição.",
    ],
    links: {
      repo: "https://github.com/Jntgirardi/ControllerArena",
    },
  },
  {
    slug: "monitor-de-vagas-n8n",
    title: "Monitor de Vagas",
    period: "Cloud Automation",
    kind: "Automação e Triagem em Nuvem (n8n)",
    summary:
      "Sistema autônomo hospedado na Oracle Cloud que coleta, deduplica, filtra por recência e envia vagas de tecnologia categorizadas em tempo real via bot no Telegram.",
    context:
      "A busca manual repetitiva por vagas em várias plataformas consumia tempo diário e apresentava anúncios duplicados ou antigos.",
    goal: "Eliminar o trabalho manual integrando scraping de feed do LinkedIn e APIs de emprego com deduplicação, filtro de recência e entrega instantânea.",
    contribution:
      "Criação dos workflows no n8n com lógica em JavaScript para deduplicação e filtragem, integração com APIs REST (JSearch, Apify) e Telegram Bot API, e deploy autônomo em container Docker na Oracle Cloud Always Free.",
    stack: [
      "n8n",
      "JavaScript",
      "Docker",
      "Oracle Cloud",
      "REST APIs (JSearch, Apify)",
      "Telegram Bot API",
    ],
    results: [
      "Eliminação da triagem manual com coleta, deduplicação e filtro de recência automatizados.",
      "Notificações instantâneas e categorizadas entregues diretamente no Telegram.",
      "Execução autônoma programada em container Docker rodando 24/7 na Oracle Cloud Always Free.",
    ],
    links: {
      repo: "https://github.com/Jntgirardi/monitor-de-vagas-n8n",
    },
  },
];

/* ───────────────────────────── Competências ──────────────────────────── */

export const skillGroups: SkillGroup[] = [
  {
    name: "Linguagens de Programação",
    description: "Base sólida em tipagem estática, programação assíncrona e consultas relacionais.",
    items: ["Python", "TypeScript", "JavaScript", "SQL", "Java"],
  },
  {
    name: "Backend & Frameworks",
    description: "Desenvolvimento de APIs REST, microsserviços assíncronos e ORMs sob Clean Architecture.",
    items: ["FastAPI", "Flask", "Spring Boot", "SQLAlchemy", "REST APIs"],
  },
  {
    name: "Frontend & Web",
    description: "Interfaces responsivas, componentizadas e estilizadas com foco em performance.",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    name: "Bancos de Dados & Cache",
    description: "Modelagem relacional persistente, documentos NoSQL flexíveis e cache em memória.",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "SQLite"],
  },
  {
    name: "DevOps, Cloud & Automação",
    description: "Conteinerização, orquestração de workflows, integração contínua e testes automatizados.",
    items: [
      "Docker",
      "n8n",
      "Oracle Cloud",
      "Git / GitHub",
      "CI/CD (GitHub Actions)",
      "pytest",
    ],
  },
  {
    name: "Sistemas, Dados & Idiomas",
    description: "Operação de ERPs industriais, análise de indicadores (KPIs) e comunicação técnica.",
    items: [
      "Produtos SAP",
      "Microsoft Excel Avançado",
      "Power BI",
      "Inglês Intermediário (Leitura e Escrita)",
      "Espanhol Básico",
    ],
  },
];

/* ───────────────────────── Experiência e formação ────────────────────── */

export const experience: TimelineEntry[] = [
  {
    title: "Jovem Aprendiz — Controle de Inventário",
    organization: "Gefpel",
    period: "Set/2025 — Jan/2026",
    location: "Feira de Santana, BA",
    description:
      "Atuação na auditoria lógica de insumos e gestão de relatórios operacionais para assegurar a confiabilidade do estoque.",
    highlights: [
      "Controle lógico e cruzamento de dados de insumos para integridade dos registros.",
      "Gestão, validação e estruturação de relatórios de estoque no Microsoft Excel.",
    ],
  },
  {
    title: "Jovem Aprendiz — Setor de Qualidade e Administração",
    organization: "Pirelli",
    period: "Mar/2024 — Jul/2025",
    location: "Feira de Santana, BA · Laboratório MIQ",
    description:
      "Atuação no Laboratório MIQ (Meio de Informação da Qualidade) com foco em conformidade técnica e rastreabilidade via SAP.",
    highlights: [
      "Operação do sistema SAP para inserção de dados de conformidade e bloqueio/liberação de lotes.",
      "Acompanhamento contínuo e consolidação de indicadores de qualidade (KPIs).",
    ],
  },
];

export const education: TimelineEntry[] = [
  {
    title: "Bacharelado em Engenharia de Software",
    organization: "UNIFAN — Centro Universitário Nobre",
    period: "Cursando (5º semestre) · Conclusão: Jun/2028",
    location: "Feira de Santana, BA · Turno Noturno",
    description:
      "Graduação com ênfase em arquitetura de software, desenvolvimento backend, bancos de dados, qualidade de software e engenharia de sistemas distribuídos.",
    highlights: [
      "5º semestre em andamento (turno noturno) com previsão de conclusão em junho de 2028.",
      "Desenvolvimento prático de sistemas SaaS multi-tenant, plataformas em tempo real e automações em nuvem.",
    ],
  },
];

/* ─────────────────────────────── Contato ─────────────────────────────── */

export const contact = {
  heading: "Vamos conversar?",
  body: "Procurando alguém para fortalecer o time em Engenharia de Software, Backend ou Automação? Fale comigo por e-mail, LinkedIn ou telefone.",
};

/* ───────────────────────────── Navegação ─────────────────────────────── */

export const navItems = [
  { id: "sobre", label: "Sobre" },
  { id: "projetos", label: "Projetos" },
  { id: "competencias", label: "Competências" },
  { id: "trajetoria", label: "Trajetória" },
  { id: "contato", label: "Contato" },
] as const;
