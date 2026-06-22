import { Check, MessageCircle, Star, Minus } from 'lucide-react'
import { cn, waLink } from '@/lib/utils'
import Reveal from '@/components/Reveal'
import WaveDivider from '@/components/WaveDivider'

interface Plan {
  name: string
  price: string
  originalPrice?: string
  discount?: string
  blackPrice: string
  differential: string
  tier: number // 0-3, quanto maior mais vantagens
  features: string[]
  highlights: string[] // até 2 destaques enxutos para o card
  cta: string
  waMessage: string
  highlighted?: boolean
  badge?: string
  aura: string // cor da aura sutil (bronze, prata, ouro, diamante)
}

const plans: Plan[] = [
  {
    name: 'Hora Avulsa',
    price: 'R$ 200',
    blackPrice: 'R$ 150',
    differential: 'Perfeito para destravar uma dúvida pontual',
    tier: 0,
    features: [
      '1h de mentoria individual',
      'Gravação da call',
      'Dúvidas no WhatsApp não consomem suas horas',
    ],
    highlights: ['1h de mentoria individual', 'Gravação da call'],
    cta: 'Tenho Interesse',
    waMessage: 'Olá Gabriel, tenho interesse no pacote de 1 hora avulsa!',
    aura: '#CD7F32', // bronze
  },
  {
    name: 'Pacote 3 Horas',
    price: 'R$ 500',
    originalPrice: 'R$ 600',
    discount: '17% OFF',
    blackPrice: 'R$ 375',
    differential: 'Horas vitalícias e o melhor custo-benefício para começar',
    tier: 1,
    features: [
      '3h de mentoria individual',
      'Horas vitalícias — nunca expiram',
      'Gravação + transcrição e resumo de cada call',
      'Dúvidas no WhatsApp não consomem suas horas',
    ],
    highlights: ['3h de mentoria individual', 'Horas vitalícias — nunca expiram'],
    cta: 'Tenho Interesse',
    waMessage: 'Olá Gabriel, tenho interesse no pacote de 3 horas (R$ 500)!',
    aura: '#C7CDD4', // prata
  },
  {
    name: 'Pacote 5 Horas',
    price: 'R$ 800',
    originalPrice: 'R$ 1.000',
    discount: '20% OFF',
    blackPrice: 'R$ 600',
    differential: 'Curso vitalício + grupo exclusivo de mentorados',
    tier: 2,
    features: [
      '5h de mentoria individual',
      'Horas vitalícias — nunca expiram',
      'Gravação + transcrição e resumo de cada call',
      'Acesso vitalício ao curso',
      'Templates prontos de clientes reais (fluxos n8n)',
      'Grupo exclusivo de mentorados com atualizações antecipadas',
    ],
    highlights: ['Templates prontos de clientes reais', 'Acesso vitalício ao curso'],
    cta: 'Tenho Interesse',
    waMessage: 'Olá Gabriel, tenho interesse no pacote de 5 horas!',
    highlighted: true,
    badge: 'Mais Popular',
    aura: '#D4AF37', // ouro
  },
  {
    name: 'Pacote 10 Horas',
    price: 'R$ 1.600',
    originalPrice: 'R$ 2.000',
    discount: '20% OFF',
    blackPrice: 'R$ 1.200',
    differential: 'Experiência completa: acompanhamento e prioridade máxima',
    tier: 3,
    features: [
      '10h de mentoria individual',
      'Tudo do Pacote 5 Horas',
      'Acompanhamento estratégico',
      'Suporte prioritário',
    ],
    highlights: ['Acompanhamento estratégico', 'Suporte prioritário'],
    cta: 'Tenho Interesse',
    waMessage: 'Olá Gabriel, tenho interesse no pacote de 10 horas!',
    aura: '#9FE7F5', // diamante
  },
]

// Matriz comparativa — cada recurso e seu valor por pacote
type Cell = boolean | string
const matrix: { label: string; values: [Cell, Cell, Cell, Cell] }[] = [
  { label: 'Horas de mentoria individual', values: ['1h', '3h', '5h', '10h'] },
  { label: 'Gravação da call', values: [true, true, true, true] },
  { label: 'Transcrição e resumo da call', values: [false, true, true, true] },
  { label: 'WhatsApp sem consumir suas horas', values: [true, true, true, true] },
  { label: 'Horas vitalícias (nunca expiram)', values: [false, true, true, true] },
  { label: 'Desconto progressivo', values: [false, '17%', '20%', '25%'] },
  { label: 'Acesso vitalício ao curso', values: [false, false, true, true] },
  { label: 'Templates de clientes reais (fluxos n8n)', values: [false, '1 template', 'Biblioteca completa', 'Biblioteca completa'] },
  { label: 'Revisão de fluxo/prompt entre sessões (assíncrono)', values: [false, false, true, true] },
  { label: 'Grupo exclusivo de mentorados', values: [false, false, true, true] },
  { label: 'Acompanhamento estratégico', values: [false, false, false, true] },
  { label: 'Roadmap de implementação personalizado', values: [false, false, false, true] },
  { label: 'Suporte prioritário', values: [false, false, 'Até 24h', 'No mesmo dia'] },
  { label: 'Mentoria Black (preço promocional)', values: ['R$ 150', 'R$ 375', 'R$ 600', 'R$ 1.200'] },
]

function Cell({ value }: { value: Cell }) {
  if (value === true)
    return (
      <div className="mx-auto w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
        <Check className="w-3 h-3 text-emerald-600" strokeWidth={2.5} />
      </div>
    )
  if (value === false)
    return <Minus className="w-4 h-4 text-gray-300 mx-auto" strokeWidth={2} />
  return (
    <span className="font-grotesk font-semibold text-gray-800 text-sm">{value}</span>
  )
}

export default function PricingSection() {
  return (
    <section id="planos" className="gradient-subtle pt-24 pb-24 px-6">
      {/* ─── Faixa full-bleed: gradiente verde "água subindo" ─── */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen mb-20">
        {/* Onda de transição — emenda orgânica vinda das Integrações (claro) */}
        <WaveDivider color="#04342C" />

        <div
          className="relative overflow-hidden py-20"
          style={{
            background:
              'linear-gradient(to bottom, #04342C 0%, #0A5544 32%, #0F6E56 62%, #1D9E75 100%)',
          }}
        >
        {/* Linhas de "superfície da água" sutis subindo */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 opacity-[0.5]"
          style={{
            background:
              'repeating-linear-gradient(to top, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 64px)',
          }}
        />
        {/* Brilho da linha-d'água no rodapé */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
          style={{
            background:
              'linear-gradient(to top, rgba(110,231,183,0.22), transparent)',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Header */}
          <Reveal className="text-center mb-6">
            <p className="font-dm font-medium text-sm uppercase tracking-widest mb-3 text-emerald-300">
              Mentoria Individual
            </p>
            <h2 className="font-grotesk text-3xl sm:text-4xl font-bold mb-4 text-white">
              Escolha Seu Pacote
            </h2>
            <p className="font-dm text-base max-w-lg mx-auto text-emerald-100/85">
              Quanto maior o pacote, mais vantagens você desbloqueia — a água de
              benefícios sobe junto.
            </p>
          </Reveal>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12 items-stretch">
            {plans.map((plan, i) => (
              <Reveal
                key={i}
                delay={i * 80}
                className={cn(
                  'group/card relative rounded-2xl p-6 flex flex-col transition-all duration-300 backdrop-blur-md',
                  plan.highlighted
                    ? 'bg-[#04342C]/70 border-2 lg:scale-[1.04] z-10'
                    : 'bg-[#04342C]/55 border hover:-translate-y-1.5',
                )}
                style={{
                  borderColor: plan.highlighted ? plan.aura : `${plan.aura}99`,
                  boxShadow: plan.highlighted
                    ? `0 0 70px -2px ${plan.aura}cc, 0 0 28px -4px ${plan.aura}aa, inset 0 0 22px -6px ${plan.aura}66`
                    : `0 0 48px -4px ${plan.aura}b3, 0 0 18px -2px ${plan.aura}80`,
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className="inline-flex items-center gap-1.5 text-white text-[11px] font-semibold font-dm px-3.5 py-1 rounded-full whitespace-nowrap shadow-[0_4px_16px_-2px_rgba(29,158,117,0.7)]"
                      style={{ backgroundColor: '#1D9E75' }}
                    >
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className="font-grotesk font-semibold text-white text-base mb-4">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mb-5">
                  {plan.originalPrice && (
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-dm text-xs text-emerald-200/50 line-through">
                        {plan.originalPrice}
                      </span>
                      <span
                        className="text-[10px] font-semibold font-dm text-[#04342C] px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: '#6ee7b7' }}
                      >
                        {plan.discount}
                      </span>
                    </div>
                  )}
                  <p className="font-grotesk text-4xl font-bold text-white leading-none">
                    {plan.price}
                    {plan.name === 'Hora Avulsa' && (
                      <span className="text-sm font-dm font-normal text-emerald-200/60">
                        /hora
                      </span>
                    )}
                  </p>
                </div>

                {/* Até 2 destaques */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {plan.highlights.map((feat, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-400/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-emerald-300" strokeWidth={2.5} />
                      </div>
                      <span className="font-dm text-xs text-emerald-50/90 leading-snug">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <a
                  href={waLink(plan.waMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-dm font-semibold text-sm transition-all duration-300',
                    plan.highlighted
                      ? 'text-white hover:brightness-110 hover:scale-[1.03] shadow-[0_6px_20px_-4px_rgba(29,158,117,0.6)]'
                      : 'border border-emerald-300/50 text-emerald-100 bg-transparent hover:bg-emerald-300/10 hover:border-emerald-300',
                  )}
                  style={plan.highlighted ? { backgroundColor: '#1D9E75' } : undefined}
                >
                  {plan.highlighted && <MessageCircle className="w-4 h-4" />}
                  {plan.cta}
                </a>
              </Reveal>
            ))}
          </div>

          {/* Link para a comparação completa */}
          <div className="text-center mt-10">
            <a
              href="#comparacao-pacotes"
              className="font-dm text-sm font-medium text-emerald-100 underline decoration-emerald-400/50 underline-offset-4 hover:text-white hover:decoration-emerald-300 transition-colors duration-300"
            >
              Veja a comparação completa de cada pacote ↓
            </a>
          </div>
        </div>
        </div>
      </div>

      <div id="comparacao-pacotes" className="max-w-6xl mx-auto scroll-mt-24">
        {/* Quadro comparativo */}
        <Reveal className="">
          <h3 className="font-grotesk text-2xl font-bold text-gray-900 text-center mb-2">
            Compare os Pacotes
          </h3>
          <p className="font-dm text-gray-500 text-sm text-center mb-8">
            Veja exatamente o que cada pacote desbloqueia.
          </p>

          <div className="glass-card rounded-3xl p-4 sm:p-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="text-left font-dm text-xs uppercase tracking-wider text-gray-400 font-medium px-4 py-4">
                    Recurso
                  </th>
                  {plans.map((p, i) => (
                    <th
                      key={i}
                      className={cn(
                        'px-4 py-4 text-center',
                        p.highlighted && 'rounded-t-2xl bg-emerald-50/70',
                      )}
                    >
                      <span className="font-grotesk font-semibold text-gray-900 text-sm">
                        {p.name}
                      </span>
                      {p.highlighted && (
                        <span className="block text-[10px] font-dm font-semibold text-emerald-600 uppercase tracking-wide mt-0.5">
                          Mais Popular
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {matrix.map((row, r) => (
                  <tr key={r} className="group">
                    <td className="font-dm text-sm text-gray-600 px-4 py-3.5 border-t border-gray-100">
                      {row.label}
                    </td>
                    {row.values.map((v, c) => (
                      <td
                        key={c}
                        className={cn(
                          'px-4 py-3.5 text-center border-t border-gray-100',
                          plans[c].highlighted && 'bg-emerald-50/40',
                          r === matrix.length - 1 && plans[c].highlighted && 'rounded-b-2xl',
                        )}
                      >
                        <Cell value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Footer note */}
        <p className="text-center font-dm text-sm text-gray-500 mt-12 max-w-2xl mx-auto">
          Suas horas são <strong className="text-gray-700">vitalícias e nunca expiram</strong> —
          use 1 por mês ou só daqui a 6 meses, quando você realmente precisar. Sem pressa, sem
          desperdício.
        </p>
        <p className="text-center font-dm text-sm text-gray-400 mt-3">
          Parcelamento em até{' '}
          <strong className="text-gray-600">3x no cartão</strong> para os pacotes ou via{' '}
          <strong className="text-gray-600">PIX</strong>.
        </p>
      </div>
    </section>
  )
}
