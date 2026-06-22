import { Video, Clock, BookOpen, Users, Headphones, Workflow } from 'lucide-react'
import { cn } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const benefits = [
  {
    icon: Video,
    title: 'Mentoria Individual Gravada',
    description: 'Cada sessão é gravada e entregue para você revisar quando quiser, no seu ritmo.',
  },
  {
    icon: Clock,
    title: 'Horas que Não Expiram',
    description: 'Use suas horas sem pressão. Elas ficam disponíveis até você precisar.',
  },
  {
    icon: BookOpen,
    title: 'Acesso Vitalício ao Curso',
    description: 'Acesso permanente ao conteúdo do curso, incluindo todas as atualizações futuras.',
  },
  {
    icon: Users,
    title: 'Grupo VIP de Networking',
    description: 'Entre em um grupo exclusivo com outros profissionais de automação de alto nível.',
  },
  {
    icon: Headphones,
    title: 'Suporte via WhatsApp',
    description: 'Tire dúvidas rápidas pelo WhatsApp entre as sessões para não travar no projeto.',
  },
  {
    icon: Workflow,
    title: 'Fluxos Prontos e Validados',
    description:
      'Você leva fluxos de automação já testados e validados, além de todos os novos que montarmos juntos durante as aulas.',
  },
]

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="gradient-subtle py-24 px-6 relative overflow-hidden">
      {/* Decorative animated orbs */}
      <div
        className="animate-float pointer-events-none absolute -top-20 -left-20 w-[360px] h-[360px] rounded-full opacity-[0.07]"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />
      <div
        className="animate-float-slow pointer-events-none absolute -bottom-24 -right-16 w-[320px] h-[320px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Tudo incluído
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900">
            O Que Você Recebe
          </h2>
        </Reveal>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon
            return (
              <Reveal
                key={i}
                delay={i * 80}
                className={cn(
                  'benefit-card group relative glass-card glass-border-glow rounded-2xl p-7',
                  'hover:shadow-glow hover:-translate-y-1.5 transition-all duration-300 cursor-default',
                )}
              >
                {/* Índice sutil */}
                <span className="absolute top-5 right-6 font-grotesk text-sm font-bold text-emerald-300/50 group-hover:text-emerald-400/70 transition-colors duration-300">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div className="benefit-icon w-12 h-12 rounded-xl bg-emerald-100/70 flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300">
                  <Icon
                    className="benefit-icon-svg w-6 h-6 text-emerald-600 transition-colors duration-300"
                    strokeWidth={1.75}
                  />
                </div>
                <h3 className="font-grotesk font-semibold text-gray-900 text-lg mb-2">
                  {item.title}
                </h3>
                <p className="font-dm text-gray-500 text-sm leading-relaxed">
                  {item.description}
                </p>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
