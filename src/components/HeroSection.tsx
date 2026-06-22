import { MessageCircle, ArrowDown, TrendingUp, Sparkles } from 'lucide-react'
import { WA_DEFAULT } from '@/lib/utils'
import ParticleField from '@/components/ParticleField'

const stats = [
  { value: '+R$130k', label: 'Faturados com IA e automação' },
  { value: '+50', label: 'Projetos entregues' },
  { value: '10', label: 'Vagas por turma' },
]

export default function HeroSection() {
  return (
    <section id="inicio" className="gradient-hero animate-gradient-pan relative overflow-hidden min-h-screen flex items-center">
      {/* Decorative animated orbs */}
      <div
        className="animate-float pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />
      <div
        className="animate-float-slow pointer-events-none absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #6ee7b7 0%, transparent 70%)' }}
      />
      <div
        className="animate-float pointer-events-none absolute top-1/3 right-1/4 w-[260px] h-[260px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #a7f3d0 0%, transparent 70%)' }}
      />

      {/* Subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '56px 56px',
        }}
      />

      {/* Campo de partículas interativo — desintegra ao passar o mouse */}
      <ParticleField className="absolute inset-0 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
        {/* Tag */}
        <div className="inline-flex items-center gap-2 glass-dark text-emerald-100 text-sm font-medium px-4 py-2 rounded-full mb-8 animate-fade-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Mentoria em Automação com IA
        </div>

        {/* Headline */}
        <h1 className="font-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          O Atalho para a{' '}
          <span className="relative">
            <span
              className="relative z-10"
              style={{
                background: 'linear-gradient(135deg, #6ee7b7, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Engenharia de Automação
            </span>
          </span>{' '}
          de Alto Nível
        </h1>

        {/* Subheadline */}
        <p className="font-dm text-lg sm:text-xl text-emerald-100/90 max-w-2xl mx-auto mb-8 leading-relaxed">
          Aprenda a construir fluxos complexos, fechar contratos lucrativos e organizar
          seus projetos com quem faturou{' '}
          <strong className="text-white font-semibold">mais de R$130 mil</strong> no
          mercado de IA e automação.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 gradient-cta text-white font-semibold font-dm px-8 py-4 rounded-2xl text-lg shadow-glow hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-700">
              <span className="animate-shimmer absolute top-0 left-0 h-full w-1/3 bg-white/25 blur-md" />
            </span>
            <MessageCircle className="w-5 h-5 relative z-10" />
            <span className="relative z-10">Falar no WhatsApp</span>
          </a>
          <a
            href="#mentoria-grupo"
            className="inline-flex items-center gap-2 glass-dark text-white font-semibold font-dm px-8 py-4 rounded-2xl text-lg hover:bg-white/15 transition-all duration-300"
          >
            <Sparkles className="w-5 h-5 text-emerald-300" />
            Mentoria em Grupo
          </a>
        </div>

        {/* Stats strip — glass */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {stats.map((s, i) => (
            <div
              key={i}
              className="glass-dark rounded-2xl px-5 py-5 text-center hover:bg-white/[0.12] transition-colors duration-300"
            >
              <p className="font-grotesk text-2xl sm:text-3xl font-bold text-white flex items-center justify-center gap-1.5">
                {i === 0 && <TrendingUp className="w-5 h-5 text-emerald-300" />}
                {s.value}
              </p>
              <p className="font-dm text-emerald-200/80 text-xs mt-1 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Scroll hint */}
        <div className="mt-14 flex justify-center animate-bounce">
          <ArrowDown className="w-5 h-5 text-emerald-400/60" />
        </div>
      </div>
    </section>
  )
}
