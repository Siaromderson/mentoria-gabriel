import { useEffect, useState, useCallback } from 'react'
import {
  Stethoscope,
  Scale,
  FileText,
  ChevronLeft,
  ChevronRight,
  Workflow,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/Reveal'

interface Tag {
  label: string
  domain?: string
}

interface Project {
  icon: typeof Stethoscope
  title: string
  description: string
  image: string
  tags: Tag[]
}

const projects: Project[] = [
  {
    icon: Stethoscope,
    title: 'IA de Pré-Atendimento para Clínica Médica',
    description:
      'Faz a triagem do paciente e transfere para o atendimento humano no momento certo.',
    image: '/projetos/ia-medica-kommo.png',
    tags: [{ label: 'Kommo', domain: 'kommo.com' }],
  },
  {
    icon: Scale,
    title: 'IA para Advocacia',
    description:
      'Realiza agendamentos no Google Calendar, integrada a um CRM personalizado desenvolvido com Claude Code.',
    image: '/projetos/avocacia-agendamento-crm-claude-code.png',
    tags: [
      { label: 'Google Calendar', domain: 'calendar.google.com' },
      { label: 'CRM próprio' },
      { label: 'Claude Code', domain: 'claude.ai' },
    ],
  },
  {
    icon: FileText,
    title: 'IA de Vendas com Orçamentos',
    description:
      'Conduz a conversa e faz o envio de orçamentos e propostas automaticamente para o cliente.',
    image: '/projetos/ia-vendas-envia-proposta.png',
    tags: [{ label: 'Orçamentos' }],
  },
]

function TagChip({ tag }: { tag: Tag }) {
  return (
    <span className="inline-flex items-center gap-1.5 font-dm text-xs font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
      {tag.domain && (
        <img
          src={`https://logo.clearbit.com/${tag.domain}`}
          alt={tag.label}
          loading="lazy"
          className="w-4 h-4 object-contain rounded-sm"
          onError={(e) => {
            const img = e.currentTarget
            if (!img.dataset.fallback) {
              img.dataset.fallback = '1'
              img.src = `https://www.google.com/s2/favicons?domain=${tag.domain}&sz=32`
            }
          }}
        />
      )}
      {tag.label}
    </span>
  )
}

export default function ProjectsSection() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = projects.length

  const go = useCallback(
    (dir: number) => setActive((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setActive((i) => (i + 1) % count), 5000)
    return () => clearInterval(id)
  }, [paused, count])

  // deslocamento relativo mais curto (circular): -1, 0, 1...
  const relOffset = (i: number) => {
    let d = i - active
    if (d > count / 2) d -= count
    if (d < -count / 2) d += count
    return d
  }

  return (
    <section id="projetos" className="gradient-subtle py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Fluxos prontos de clientes reais
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Projetos Reais que Você Vai Receber
          </h2>
          <p className="font-dm text-gray-500 text-base max-w-2xl mx-auto leading-relaxed">
            Ao longo das aulas eu compartilho fluxos prontos de clientes reais e explico,
            passo a passo, como funciona a implementação de cada um.
          </p>
        </Reveal>

        {/* Carrossel com profundidade */}
        <Reveal
          className="relative h-[440px] sm:h-[480px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: '1600px' }}
          >
            {projects.map((project, i) => {
              const off = relOffset(i)
              const abs = Math.abs(off)
              const isActive = off === 0
              return (
                <button
                  key={i}
                  onClick={() => !isActive && setActive(i)}
                  aria-label={project.title}
                  tabIndex={isActive ? -1 : 0}
                  className="absolute w-[88%] sm:w-[560px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{
                    transform: `translateX(${off * 42}%) scale(${1 - abs * 0.16}) rotateY(${off * -12}deg)`,
                    filter: `blur(${abs * 3}px)`,
                    opacity: abs > 1 ? 0 : 1 - abs * 0.25,
                    zIndex: 10 - abs,
                    pointerEvents: abs > 1 ? 'none' : 'auto',
                    cursor: isActive ? 'default' : 'pointer',
                  }}
                >
                  <div
                    className={cn(
                      'glass-card rounded-3xl overflow-hidden text-left transition-shadow duration-500',
                      isActive ? 'shadow-glow' : 'shadow-card',
                    )}
                  >
                    {/* Imagem do fluxo */}
                    <div className="relative h-44 sm:h-52 bg-emerald-950 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-90"
                      />
                      <div
                        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
                        style={{
                          background:
                            'radial-gradient(circle at 30% 30%, #34d399, transparent 60%)',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 inline-flex items-center gap-2 glass-dark text-emerald-100 text-xs font-medium px-3 py-1.5 rounded-full">
                        <Workflow className="w-3.5 h-3.5 text-emerald-300" />
                        Fluxo real no n8n
                      </div>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-6 sm:p-8">
                      <div className="w-11 h-11 rounded-xl bg-emerald-100/70 flex items-center justify-center mb-4">
                        <project.icon
                          className="w-5 h-5 text-emerald-600"
                          strokeWidth={1.75}
                        />
                      </div>
                      <h3 className="font-grotesk font-bold text-gray-900 text-lg sm:text-xl mb-2 leading-snug">
                        {project.title}
                      </h3>
                      <p className="font-dm text-gray-500 text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <TagChip key={tag.label} tag={tag} />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Setas */}
          <button
            onClick={() => go(-1)}
            aria-label="Projeto anterior"
            className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-4 z-20 w-11 h-11 rounded-full glass-card shadow-card flex items-center justify-center text-emerald-700 hover:scale-110 hover:text-emerald-900 transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Próximo projeto"
            className="absolute top-1/2 -translate-y-1/2 right-0 sm:right-4 z-20 w-11 h-11 rounded-full glass-card shadow-card flex items-center justify-center text-emerald-700 hover:scale-110 hover:text-emerald-900 transition-all duration-300"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </Reveal>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Ir para o projeto ${i + 1}`}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                i === active
                  ? 'w-8 gradient-cta shadow-glow'
                  : 'w-2.5 bg-emerald-200 hover:bg-emerald-300',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
