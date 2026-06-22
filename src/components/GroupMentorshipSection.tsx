import { useEffect, useRef } from 'react'
import {
  Users,
  Video,
  FolderGit2,
  MessagesSquare,
  Briefcase,
  Rocket,
  Check,
  MessageCircle,
  Flame,
  FileText,
  CalendarDays,
  CalendarClock,
  LineChart,
  MessageSquareText,
} from 'lucide-react'
import { waLink } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const includes = [
  {
    icon: Video,
    title: 'Encontros ao Vivo',
    description:
      'Aulas e mentorias em grupo ao vivo, com conteúdos específicos e aprofundados de automação e IA.',
  },
  {
    icon: FolderGit2,
    title: 'Desenvolvimento de Projetos',
    description:
      'A gente coloca a mão na massa: construímos projetos reais juntos, do planejamento à entrega.',
  },
  {
    icon: MessagesSquare,
    title: 'Debate do Seu Projeto',
    description:
      'Reservamos um tempo em cada turma para discutir o projeto de cada participante e destravar o que estiver travado.',
  },
  {
    icon: Briefcase,
    title: 'Bastidores Reais',
    description:
      'Abro projetos reais, conversas com clientes e como eu negocio — nada de teoria solta.',
  },
  {
    icon: Rocket,
    title: 'Do Zero à Entrega',
    description:
      'Você vê todo o meu processo de trabalho completo: do primeiro contato até a entrega final do projeto.',
  },
  {
    icon: Users,
    title: 'Networking de Verdade',
    description:
      'Um grupo pequeno e selecionado de pessoas no mesmo caminho, trocando experiências e oportunidades.',
  },
  {
    icon: FileText,
    title: 'Gravação, Transcrição e Resumo',
    description:
      'Cada encontro fica registrado: você recebe a gravação, a transcrição e o resumo da call para revisar quando quiser.',
  },
  {
    icon: Users,
    title: 'Grupos Exclusivos',
    description:
      'Grupo fechado da sua turma + acesso ao grupo exclusivo de todos os mentorados, onde solto atualizações antecipadas.',
  },
]

// Detalhes da próxima turma da Mentoria Black
const turmaDetails = [
  {
    icon: CalendarDays,
    label: 'Início',
    value: 'Próximas aulas começam em Julho',
  },
  {
    icon: CalendarClock,
    label: 'Frequência',
    value: '2 calls por semana, durante o mês',
  },
  {
    icon: LineChart,
    label: 'Acompanhamento',
    value: 'Acompanhamento do projeto de cada um',
  },
  {
    icon: MessageSquareText,
    label: 'Comunidade',
    value: 'Grupo de WhatsApp exclusivo da turma',
  },
]

const checklist = [
  'Início em Julho — 2 calls por semana, durante o mês',
  'Conteúdos específicos e aprofundados',
  'Acompanhamento do projeto de cada participante',
  'Gravação, transcrição e resumo de cada call',
  'Grupo de WhatsApp exclusivo da turma',
]

/**
 * Carrossel de entregáveis guiado pelo scroll vertical:
 * conforme a página rola para baixo, a faixa "abre" e desliza para o lado.
 */
function IncludesScrollCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  // lista duplicada para criar o loop contínuo
  const loop = [...includes, ...includes]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = 0
    let last = 0
    let paused = false
    const SPEED = 45 // px/s

    // estado de arraste
    let dragging = false
    let startX = 0
    let startScroll = 0

    const half = () => el.scrollWidth / 2

    const tick = (now: number) => {
      if (!last) last = now
      const dt = (now - last) / 1000
      last = now
      if (!paused && !dragging && !reduced) {
        el.scrollLeft += SPEED * dt
      }
      // loop sem emenda
      if (el.scrollLeft >= half()) el.scrollLeft -= half()
      else if (el.scrollLeft < 0) el.scrollLeft += half()
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = () => (paused = true)
    const onLeave = () => {
      paused = false
      dragging = false
      el.classList.remove('cursor-grabbing')
    }
    const onDown = (e: PointerEvent) => {
      dragging = true
      startX = e.clientX
      startScroll = el.scrollLeft
      el.setPointerCapture(e.pointerId)
      el.classList.add('cursor-grabbing')
    }
    const onMove = (e: PointerEvent) => {
      if (!dragging) return
      el.scrollLeft = startScroll - (e.clientX - startX)
    }
    const onUp = (e: PointerEvent) => {
      dragging = false
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* ignore */
      }
      el.classList.remove('cursor-grabbing')
    }

    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    el.addEventListener('pointerdown', onDown)
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerup', onUp)

    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.removeEventListener('pointerdown', onDown)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerup', onUp)
    }
  }, [])

  return (
    <div className="relative">
      <div className="max-w-6xl mx-auto w-full px-6 mb-8">
        <h3 className="font-grotesk text-2xl sm:text-3xl font-bold text-white text-center">
          O Que Você Recebe na Turma
        </h3>
        <p className="font-dm text-emerald-100/70 text-sm text-center mt-2">
          Os entregáveis passam sozinhos — arraste para o lado para ver todos. ↔
        </p>
      </div>

      {/* Esteira horizontal com auto-scroll + arraste, fade nas bordas */}
      <div className="marquee-mask">
        <div
          ref={scrollRef}
          className="flex gap-6 px-[8vw] overflow-x-auto cursor-grab select-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {loop.map((item, i) => {
            const Icon = item.icon
            const n = (i % includes.length) + 1
            return (
              <div
                key={i}
                className="group relative w-[78vw] sm:w-[340px] shrink-0 glass-dark rounded-3xl p-7 border border-emerald-300/15 hover:border-emerald-300/50 hover:shadow-glow transition-colors duration-300"
              >
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-grotesk text-emerald-300/50 text-sm font-bold">
                    {String(n).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-emerald-300/15" />
                </div>
                <div className="w-12 h-12 rounded-xl gradient-cta flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-white" strokeWidth={1.75} />
                </div>
                <h4 className="font-grotesk font-semibold text-white text-lg mb-2">
                  {item.title}
                </h4>
                <p className="font-dm text-emerald-100/75 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default function GroupMentorshipSection() {
  return (
    <section
      id="mentoria-grupo"
      className="gradient-hero animate-gradient-pan relative py-24 px-6"
    >
      {/* Decorative animated orbs (clipados num wrapper p/ não quebrar o sticky) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-float absolute -top-24 right-0 w-[420px] h-[420px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
        />
        <div
          className="animate-float-slow absolute bottom-0 -left-24 w-[360px] h-[360px] rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6ee7b7 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Topo: texto (esquerda) + card de valor (direita) */}
        <div className="grid lg:grid-cols-2 gap-10 items-center mb-16">
          {/* Texto */}
          <Reveal className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 glass-dark text-emerald-100 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <Flame className="w-4 h-4 text-emerald-300" />
              Mentoria Black · Mentoria em Grupo
            </div>
            <h2 className="font-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
              Aprenda em Grupo,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #6ee7b7, #34d399)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Evolua na Prática
              </span>
            </h2>
            <p className="font-dm text-emerald-100/90 text-lg leading-relaxed">
              Uma turma pequena e focada, com encontros ao vivo, projetos reais e os
              bastidores completos do meu processo de trabalho — do zero até a entrega.
            </p>

            {/* Detalhes da próxima turma da Mentoria Black */}
            <div className="mt-8 glass-dark rounded-2xl p-6 text-left border border-emerald-300/20">
              <p className="text-emerald-300 font-dm font-semibold text-xs uppercase tracking-widest mb-4">
                Próxima turma · Mentoria Black
              </p>
              <ul className="grid sm:grid-cols-2 gap-4">
                {turmaDetails.map((d, i) => {
                  const Icon = d.icon
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg gradient-cta flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
                      </div>
                      <div>
                        <p className="font-dm text-emerald-300/80 text-[11px] uppercase tracking-wider font-semibold">
                          {d.label}
                        </p>
                        <p className="font-dm text-white text-sm leading-snug">{d.value}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-6 glass-dark rounded-2xl p-6 text-left border border-emerald-300/20">
              <p className="text-emerald-300 font-dm font-semibold text-xs uppercase tracking-widest mb-2">
                Projeto da turma
              </p>
              <p className="font-dm text-white text-base leading-relaxed">
                Vamos construir, juntos, um <strong>fluxo completo de agente de IA</strong>{' '}
                integrado a um <strong>sistema profissional de CRM</strong>, com{' '}
                <strong>dashboard essencial para IA</strong> e{' '}
                <strong>integrações externas</strong>.
              </p>
            </div>
          </Reveal>

          {/* Pricing card */}
          <Reveal delay={120}>
            <div className="glass-card glass-border-glow rounded-3xl p-8 animate-glow-pulse">
              {/* Scarcity */}
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-semibold font-dm px-3 py-1.5 rounded-full mb-5">
                <Flame className="w-3.5 h-3.5" />
                Apenas 10 vagas por turma
              </div>

              <h3 className="font-grotesk font-semibold text-gray-900 text-xl mb-1">
                Mentoria em Grupo
              </h3>
              <p className="font-dm text-gray-500 text-sm mb-5">
                Vagas limitadas — turma fechada e selecionada.
              </p>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-end gap-2">
                  <span className="font-grotesk text-5xl font-bold text-gray-900">R$ 497</span>
                </div>
                <p className="font-dm text-xs text-emerald-600 font-medium mt-1">
                  Investimento único para participar
                </p>
                <p className="font-dm text-xs text-gray-500 mt-2">
                  <strong className="text-gray-700">R$ 297</strong> para quem já foi mentorado
                  anteriormente.
                </p>
              </div>

              <div className="border-t border-emerald-100 mb-6" />

              {/* Checklist */}
              <ul className="space-y-3 mb-8">
                {checklist.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600" strokeWidth={2.5} />
                    </div>
                    <span className="font-dm text-sm text-gray-600 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={waLink(
                  'Olá Gabriel, quero garantir minha vaga na Mentoria em Grupo!',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl font-dm font-semibold text-sm gradient-cta text-white shadow-glow hover:scale-[1.03] transition-all duration-300 overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-0">
                  <span className="animate-shimmer absolute top-0 left-0 h-full w-1/3 bg-white/25 blur-md" />
                </span>
                <MessageCircle className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Quero Minha Vaga</span>
              </a>

              <p className="font-dm text-center text-xs text-gray-400 mt-4">
                Parcelamento em até 3x no cartão ou via PIX.
              </p>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Entregáveis — esteira abaixo do texto + valor */}
      <div className="relative z-10">
        <IncludesScrollCarousel />
      </div>
    </section>
  )
}
