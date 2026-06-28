import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Compass,
  FileText,
  Instagram,
  Layers,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  PaintBucket,
  Rocket,
  Send,
  Smartphone,
  Sparkles,
  Target,
  UtensilsCrossed,
  Zap,
  Coffee,
  Scissors,
} from "lucide-react";
import { z } from "zod";
import { toast, Toaster } from "sonner";

import heroLaptop from "@/assets/hero-laptop.jpg";
import aboutWorkspace from "@/assets/about-workspace.jpg";
import projectRestaurant from "@/assets/project-restaurant.jpg";
import projectBarbershop from "@/assets/project-barbershop.jpg";
import projectCafe from "@/assets/project-cafe.jpg";
import zezeLogo from "@/assets/zeze-logo.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zeze — Sites profissionais para o seu negócio" },
      {
        name: "description",
        content:
          "Estúdio digital especializado em sites institucionais de alto padrão para restaurantes, cafeterias e barbearias.",
      },
      { property: "og:title", content: "Zeze — Sites profissionais para o seu negócio" },
      {
        property: "og:description",
        content:
          "Estúdio digital especializado em sites institucionais de alto padrão para restaurantes, cafeterias e barbearias.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroLaptop, fetchpriority: "high" } as any,
    ],
  }),
  component: HomePage,
});

/* ---------------- Reveal on scroll ---------------- */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ---------------- Animated counter ---------------- */

function Counter({ to, suffix = "", duration = 1600 }: { to: number; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(to * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ---------------- Navbar ---------------- */

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Projetos", href: "#projetos" },
  { label: "Serviços", href: "#servicos" },
  { label: "Processo", href: "#processo" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-hairline"
          : "bg-transparent border-b border-transparent",
      ].join(" ")}
    >
      <div className="container-x flex h-16 md:h-20 items-center justify-between gap-6">
        <a href="#inicio" aria-label="Zeze — Início" className="flex items-center gap-2">
          <img src={zezeLogo.url} alt="Logo Zeze" className="h-9 w-9 rounded-xl object-cover" />
          <span className="text-base font-semibold tracking-tight">Zeze</span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
              <span className="pointer-events-none absolute left-3 right-3 -bottom-0.5 h-px origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#contato"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 hover:gap-3"
          >
            Solicitar orçamento
            <ArrowRight className="h-4 w-4" />
          </a>
          <button
            aria-label="Abrir menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-hairline"
          >
            <div className="flex flex-col gap-1.5">
              <span className={["h-px w-4 bg-foreground transition-transform", open ? "translate-y-[3px] rotate-45" : ""].join(" ")} />
              <span className={["h-px w-4 bg-foreground transition-opacity", open ? "opacity-0" : "opacity-100"].join(" ")} />
              <span className={["h-px w-4 bg-foreground transition-transform", open ? "-translate-y-[3px] -rotate-45" : ""].join(" ")} />
            </div>
          </button>
        </div>
      </div>
      {/* mobile menu */}
      <div
        className={[
          "lg:hidden overflow-hidden border-b border-hairline bg-background transition-[max-height,opacity] duration-500 ease-out",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
      >
        <nav className="container-x flex flex-col py-4">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="py-3 text-base text-foreground border-b border-hairline last:border-0"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
          >
            Solicitar orçamento <ArrowRight className="h-4 w-4" />
          </a>
        </nav>
      </div>
    </header>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-28 md:pt-32 overflow-hidden">
      {/* background geometry */}
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg" />
      <div aria-hidden className="absolute -top-24 -right-24 -z-10 h-[420px] w-[420px] rounded-full border border-hairline" />
      <div aria-hidden className="absolute -top-10 right-40 -z-10 h-2 w-2 rounded-full bg-foreground float-soft" />
      <div aria-hidden className="absolute bottom-24 left-20 -z-10 h-24 w-24 rounded-2xl border border-hairline" />

      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-16 items-center py-12 md:py-20">
        <div className="lg:col-span-7" data-reveal>
          <span className="eyebrow eyebrow-dot">Estúdio digital · Brasil</span>
          <h1 className="heading-display mt-6 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl">
            Seu negócio merece um site que realmente{" "}
            <span className="relative inline-block">
              transmite profissionalismo
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                className="absolute -bottom-2 left-0 w-full text-foreground"
                preserveAspectRatio="none"
              >
                <path d="M2 8 C 80 2, 220 2, 298 8" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-muted-foreground">
            Criamos sites rápidos, modernos e responsivos para empresas que desejam conquistar mais clientes
            e fortalecer sua presença digital.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#contato"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90"
            >
              Solicitar orçamento
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#projetos"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/15 px-6 py-3.5 text-sm font-medium text-foreground transition-all hover:border-foreground hover:bg-secondary"
            >
              Ver projetos
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-7 w-7 rounded-full border-2 border-background bg-secondary" />
              ))}
            </div>
            <span>
              Pequenos negócios <span className="text-foreground font-medium">com presença digital de marca</span>
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 relative" data-reveal>
          <div className="relative rounded-3xl bg-surface p-3 shadow-soft border border-hairline">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={heroLaptop}
                alt="Notebook exibindo um site moderno desenvolvido pela Zeze"
                width={1600}
                height={1200}
                fetchPriority="high"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="pointer-events-none absolute -top-4 -right-4 grid h-20 w-20 place-items-center rounded-2xl bg-foreground text-background shadow-lift float-soft">
              <Sparkles className="h-7 w-7" />
            </div>
          </div>
          {/* floating mini-card */}
          <div className="absolute -bottom-6 -left-4 sm:-left-8 rounded-2xl bg-background border border-hairline shadow-soft px-4 py-3 flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
              <Zap className="h-4 w-4" />
            </div>
            <div className="text-xs">
              <div className="font-medium text-foreground">Lighthouse 95+</div>
              <div className="text-muted-foreground">Performance otimizada</div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        <span>scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </div>
    </section>
  );
}

/* ---------------- Stats ---------------- */

function Stats() {
  const items = [
    { value: 30, suffix: "+", label: "Layouts desenvolvidos" },
    { value: 100, suffix: "%", label: "Sites responsivos" },
    { value: 90, suffix: "+", label: "Pontuação Lighthouse" },
    { value: 24, suffix: "h", label: "Primeira resposta" },
  ];
  return (
    <section className="border-y border-hairline bg-surface">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4 divide-x divide-hairline">
        {items.map((it, idx) => (
          <div key={idx} className="py-10 md:py-14 px-4 md:px-8 text-center" data-reveal>
            <div className="heading-display text-4xl md:text-5xl lg:text-6xl text-foreground">
              <Counter to={it.value} suffix={it.suffix} />
            </div>
            <div className="mt-3 text-xs md:text-sm text-muted-foreground tracking-wide">{it.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- About ---------------- */

function About() {
  return (
    <section id="sobre" className="py-24 md:py-36">
      <div className="container-x grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
        <div className="lg:col-span-6 relative order-2 lg:order-1" data-reveal>
          <div className="relative rounded-3xl overflow-hidden border border-hairline shadow-soft">
            <img
              src={aboutWorkspace}
              alt="Equipe da Zeze trabalhando no design de um site"
              width={1408}
              height={1200}
              loading="lazy"
              className="w-full h-[500px] md:h-[600px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 rounded-2xl bg-foreground text-background px-5 py-4 shadow-lift max-w-[220px]">
            <div className="text-3xl heading-display">+30</div>
            <div className="text-xs text-background/70 mt-1">Projetos elaborados com atenção a cada pixel</div>
          </div>
        </div>
        <div className="lg:col-span-6 order-1 lg:order-2" data-reveal>
          <span className="eyebrow eyebrow-dot">Quem somos</span>
          <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
            Estúdio digital focado em <span className="text-muted-foreground">credibilidade</span> para pequenos negócios.
          </h2>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
            A Zeze desenvolve sites modernos para empresas que desejam transmitir mais credibilidade na internet.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Nosso objetivo é transformar a primeira impressão dos seus clientes em uma experiência profissional
            através de design, tecnologia e estratégia.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            {[
              { k: "Design", v: "Interfaces sob medida" },
              { k: "Código", v: "Performance e SEO" },
              { k: "Estratégia", v: "Foco em conversão" },
              { k: "Suporte", v: "Resposta em até 24h" },
            ].map((it) => (
              <div key={it.k} className="rounded-2xl border border-hairline p-5 transition-colors hover:bg-surface">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{it.k}</div>
                <div className="mt-1 text-base font-medium text-foreground">{it.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

const SERVICES = [
  { icon: Rocket, title: "Landing Pages", desc: "Páginas de alta conversão para campanhas e lançamentos." },
  { icon: Layers, title: "Sites Institucionais", desc: "Presença digital sólida para fortalecer a sua marca." },
  { icon: UtensilsCrossed, title: "Sites para Restaurantes", desc: "Cardápios online, reservas e identidade visual." },
  { icon: Coffee, title: "Sites para Cafeterias", desc: "Experiência aconchegante traduzida em interface." },
  { icon: Scissors, title: "Sites para Barbearias", desc: "Agendamentos, galeria e contato facilitado." },
  { icon: FileText, title: "Portfólios", desc: "Vitrines elegantes para profissionais e criativos." },
  { icon: Target, title: "SEO", desc: "Otimização para você ser encontrado no Google." },
  { icon: MessageCircle, title: "Integração com WhatsApp", desc: "Botão direto para acelerar o contato com clientes." },
];

function Services() {
  return (
    <section id="servicos" className="py-24 md:py-36 bg-surface border-y border-hairline">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14" data-reveal>
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Serviços</span>
            <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
              Soluções completas, sob medida para o seu negócio.
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground leading-relaxed">
            Trabalhamos do conceito ao lançamento — design, código, performance e estratégia em um só estúdio.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }, idx) => (
            <article
              key={title}
              data-reveal
              className="group relative rounded-2xl bg-background border border-hairline p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-soft hover:border-foreground/20"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs text-muted-foreground tabular-nums">0{idx + 1}</span>
              </div>
              <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
              <ArrowUpRight className="absolute bottom-5 right-5 h-4 w-4 text-muted-foreground transition-all group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

const STEPS = [
  { n: "01", title: "Briefing", icon: FileText, desc: "Conversamos para entender seu negócio e objetivos." },
  { n: "02", title: "Planejamento", icon: Compass, desc: "Definimos escopo, conteúdo e estrutura ideal." },
  { n: "03", title: "Design", icon: PaintBucket, desc: "Criamos um visual único e alinhado com a sua marca." },
  { n: "04", title: "Desenvolvimento", icon: Code2, desc: "Codificamos com performance e SEO em mente." },
  { n: "05", title: "Revisões", icon: Sparkles, desc: "Ajustes finos até cada detalhe ficar perfeito." },
  { n: "06", title: "Entrega", icon: Rocket, desc: "Publicação, treinamento e suporte contínuo." },
];

function Process() {
  return (
    <section id="processo" className="py-24 md:py-36">
      <div className="container-x">
        <div className="max-w-2xl mb-16" data-reveal>
          <span className="eyebrow eyebrow-dot">Processo</span>
          <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
            Do briefing ao lançamento, sem ruído.
          </h2>
          <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
            Um processo claro, transparente e colaborativo em seis etapas bem definidas.
          </p>
        </div>

        <div className="relative">
          <div aria-hidden className="hidden lg:block absolute left-0 right-0 top-[58px] h-px bg-hairline" />
          <ol className="grid gap-6 lg:gap-4 lg:grid-cols-6">
            {STEPS.map(({ n, title, icon: Icon, desc }) => (
              <li key={n} data-reveal className="relative">
                <div className="flex lg:flex-col items-start gap-4">
                  <div className="relative z-10 grid h-[58px] w-[58px] shrink-0 place-items-center rounded-2xl bg-background border border-hairline transition-all hover:bg-foreground hover:text-background hover:border-foreground">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs text-muted-foreground tabular-nums">{n}</div>
                    <div className="text-base font-semibold mt-1 text-foreground">{title}</div>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Projects ---------------- */

const PROJECTS = [
  {
    img: projectRestaurant,
    category: "Restaurante",
    name: "Trattoria Bianca",
    desc: "Identidade refinada com cardápio digital e reservas integradas.",
  },
  {
    img: projectBarbershop,
    category: "Barbearia",
    name: "Norte Barber Co.",
    desc: "Marca masculina com agendamentos diretos pelo WhatsApp.",
  },
  {
    img: projectCafe,
    category: "Cafeteria",
    name: "Casa Lume Café",
    desc: "Atmosfera aconchegante traduzida em uma experiência elegante.",
  },
];

function Projects() {
  return (
    <section id="projetos" className="py-24 md:py-36 bg-surface border-y border-hairline">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14" data-reveal>
          <div className="max-w-2xl">
            <span className="eyebrow eyebrow-dot">Projetos demonstrativos</span>
            <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
              Demonstrações de layout criadas pela Zeze.
            </h2>
          </div>
          <p className="md:max-w-sm text-muted-foreground leading-relaxed">
            Estes projetos são exemplos visuais desenvolvidos para apresentar a qualidade do nosso trabalho —
            não representam clientes reais.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              data-reveal
              className="group rounded-3xl bg-background border border-hairline overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={p.img}
                  alt={`${p.category} — ${p.name}`}
                  width={1400}
                  height={1000}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />
                <span className="absolute top-4 left-4 inline-flex items-center rounded-full bg-background/85 backdrop-blur px-3 py-1 text-[11px] tracking-wide text-foreground border border-hairline">
                  {p.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    className="group/btn inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    Ver projeto
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
                  </button>
                  <span className="text-xs text-muted-foreground">Demonstração</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Differentials ---------------- */

const DIFFS = [
  { icon: Zap, title: "Desenvolvimento moderno", desc: "Sites rápidos, leves e com excelente experiência." },
  { icon: Smartphone, title: "Responsividade", desc: "Funcionamento perfeito em computadores, tablets e celulares." },
  { icon: Target, title: "Foco em conversão", desc: "Layouts desenvolvidos para facilitar o contato dos clientes." },
  { icon: Sparkles, title: "Design profissional", desc: "Visual moderno que transmite confiança para qualquer empresa." },
];

function Differentials() {
  return (
    <section className="py-24 md:py-36">
      <div className="container-x">
        <div className="max-w-2xl mb-14" data-reveal>
          <span className="eyebrow eyebrow-dot">Diferenciais</span>
          <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
            Tudo aquilo que faz a diferença.
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DIFFS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              data-reveal
              className="group rounded-2xl border border-hairline p-7 transition-all hover:bg-foreground hover:text-background"
            >
              <Icon className="h-6 w-6" />
              <h3 className="mt-8 text-lg font-semibold tracking-tight">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison ---------------- */

function Comparison() {
  const left = [
    "Difícil de encontrar",
    "Menor credibilidade",
    "Pouca presença online",
    "Informações espalhadas",
    "Contato menos prático",
  ];
  const right = [
    "Mais credibilidade",
    "Melhor presença no Google",
    "Informações organizadas",
    "Contato facilitado",
    "Imagem mais profissional",
  ];
  return (
    <section className="py-24 md:py-36 bg-surface border-y border-hairline">
      <div className="container-x">
        <div className="max-w-2xl mb-14" data-reveal>
          <span className="eyebrow eyebrow-dot">Comparativo</span>
          <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
            A diferença que um site profissional faz.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
          <div data-reveal className="rounded-3xl border border-hairline bg-background p-8 md:p-10">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">Sem site</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-muted-foreground">
                <Minus className="h-4 w-4" />
              </span>
            </div>
            <ul className="mt-8 space-y-4">
              {left.map((l) => (
                <li key={l} className="flex items-center gap-3 text-muted-foreground">
                  <span className="h-1 w-6 bg-hairline" />
                  <span className="text-base">{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-3xl bg-foreground text-background p-8 md:p-10 shadow-lift">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-background/70">Com um site profissional</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-background text-foreground">
                <Check className="h-4 w-4" />
              </span>
            </div>
            <ul className="mt-8 space-y-4">
              {right.map((r) => (
                <li key={r} className="flex items-center gap-3">
                  <Check className="h-4 w-4 shrink-0" />
                  <span className="text-base">{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */

const FAQS = [
  { q: "Quanto tempo leva para desenvolver um site?", a: "O prazo médio varia entre 7 e 21 dias úteis, dependendo do escopo e da agilidade no envio de informações e materiais." },
  { q: "O site funciona no celular?", a: "Sim. Todos os nossos sites são totalmente responsivos, testados em diversos dispositivos e otimizados para a melhor experiência mobile." },
  { q: "Posso solicitar alterações?", a: "Claro. Cada projeto inclui rodadas de revisão para garantir que o resultado final esteja alinhado às suas expectativas." },
  { q: "Como funciona o pagamento?", a: "Trabalhamos com entrada e parcelas conforme o escopo do projeto. Detalhamos tudo na proposta personalizada." },
  { q: "Meu site aparecerá no Google?", a: "Sim. Configuramos SEO técnico, meta tags, sitemap e estrutura semântica para que o Google indexe seu site corretamente." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-24 md:py-36">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4" data-reveal>
          <span className="eyebrow eyebrow-dot">FAQ</span>
          <h2 className="heading-display mt-6 text-4xl md:text-5xl">
            Perguntas frequentes.
          </h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Ainda tem dúvidas? Fale com a gente — respondemos em até 24h.
          </p>
        </div>
        <div className="lg:col-span-8">
          <div className="border-t border-hairline">
            {FAQS.map((f, idx) => {
              const isOpen = open === idx;
              return (
                <div key={f.q} className="border-b border-hairline" data-reveal>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                  >
                    <span className="text-lg md:text-xl font-medium text-foreground group-hover:translate-x-0.5 transition-transform">{f.q}</span>
                    <span
                      className={[
                        "grid h-10 w-10 shrink-0 place-items-center rounded-full border border-hairline transition-all duration-500",
                        isOpen ? "bg-foreground text-background border-foreground rotate-180" : "",
                      ].join(" ")}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  <div
                    className={[
                      "grid transition-all duration-500 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0",
                    ].join(" ")}
                  >
                    <div className="overflow-hidden">
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Contact + CTA ---------------- */

const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(100),
  company: z.string().trim().min(1, "Informe sua empresa").max(120),
  instagram: z.string().trim().max(80).optional().or(z.literal("")),
  phone: z.string().trim().min(8, "Telefone inválido").max(30),
  email: z.string().trim().email("E-mail inválido").max(160),
  message: z.string().trim().min(10, "Conte um pouco sobre o projeto").max(2000),
});

function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      instagram: String(fd.get("instagram") || ""),
      phone: String(fd.get("phone") || ""),
      email: String(fd.get("email") || ""),
      message: String(fd.get("message") || ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast.success("Recebemos seu pedido! Respondemos em até 24h.");
    }, 700);
  }

  return (
    <section id="contato" className="py-24 md:py-36 bg-foreground text-background">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5" data-reveal>
            <span className="inline-flex items-center gap-2 text-xs tracking-[0.18em] uppercase text-background/60">
              <span className="h-1.5 w-1.5 rounded-full bg-background" /> Vamos conversar
            </span>
            <h2 className="heading-display mt-6 text-4xl md:text-5xl lg:text-6xl">
              Vamos criar o site da sua empresa?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-background/70 max-w-md">
              Solicite um orçamento sem compromisso e descubra como um site profissional pode ajudar
              sua empresa a conquistar mais clientes.
            </p>

            <div className="mt-12 space-y-5">
              <a href="mailto:contato@zeze.com.br" className="flex items-center gap-4 group">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-background/10 border border-background/15 group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Mail className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-background/60">E-mail</span>
                  <span className="block text-base font-medium">contato@zeze.com.br</span>
                </span>
              </a>
              <a href="https://wa.me/5500000000000" className="flex items-center gap-4 group">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-background/10 border border-background/15 group-hover:bg-background group-hover:text-foreground transition-colors">
                  <MessageCircle className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-background/60">WhatsApp</span>
                  <span className="block text-base font-medium">Conversar agora</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-background/10 border border-background/15">
                  <MapPin className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-widest text-background/60">Atendemos</span>
                  <span className="block text-base font-medium">Todo o Brasil — 100% online</span>
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7" data-reveal>
            <form
              onSubmit={onSubmit}
              className="rounded-3xl bg-background text-foreground p-6 md:p-10 border border-background/10"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Nome" name="name" placeholder="Seu nome" autoComplete="name" />
                <Field label="Empresa" name="company" placeholder="Nome da empresa" autoComplete="organization" />
                <Field label="Instagram" name="instagram" placeholder="@suaempresa" />
                <Field label="Telefone" name="phone" placeholder="(00) 00000-0000" type="tel" autoComplete="tel" />
                <div className="sm:col-span-2">
                  <Field label="E-mail" name="email" placeholder="voce@email.com" type="email" autoComplete="email" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
                    Mensagem
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Conte um pouco sobre o seu projeto"
                    className="w-full rounded-2xl bg-surface border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/30 transition-all"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="mt-7 group inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all hover:bg-foreground/90 disabled:opacity-60"
              >
                {submitting ? "Enviando..." : "Solicitar orçamento"}
                <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <p className="mt-4 text-xs text-muted-foreground">
                Ao enviar, você concorda em ser contatado(a) sobre o seu projeto.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label, name, placeholder, type = "text", autoComplete,
}: { label: string; name: string; placeholder?: string; type?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full rounded-2xl bg-surface border border-hairline px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/15 focus:border-foreground/30 transition-all"
      />
    </div>
  );
}

/* ---------------- Footer ---------------- */

function Footer() {
  return (
    <footer className="border-t border-hairline py-12">
      <div className="container-x flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <img src={zezeLogo.url} alt="Logo Zeze" className="h-9 w-9 rounded-xl object-cover" />
          <span className="font-semibold tracking-tight">Zeze</span>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          {NAV_ITEMS.map((i) => (
            <a key={i.href} href={i.href} className="hover:text-foreground transition-colors">{i.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <a href="https://instagram.com" aria-label="Instagram" className="grid h-9 w-9 place-items-center rounded-full border border-hairline hover:bg-foreground hover:text-background transition-colors">
            <Instagram className="h-4 w-4" />
          </a>
          <span>© {new Date().getFullYear()} Zeze</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- WhatsApp floating ---------------- */

function WhatsAppFab() {
  return (
    <a
      href="https://wa.me/5500000000000?text=Ol%C3%A1%21%20Gostaria%20de%20um%20or%C3%A7amento."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-foreground text-background shadow-lift wa-pulse transition-transform hover:scale-105"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

/* ---------------- Page ---------------- */

function HomePage() {
  useReveal();
  return (
    <main className="bg-background text-foreground antialiased">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <Services />
      <Process />
      <Projects />
      <Differentials />
      <Comparison />
      <Faq />
      <Contact />
      <Footer />
      <WhatsAppFab />
      <Toaster position="top-right" richColors closeButton />
    </main>
  );
}
