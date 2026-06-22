import { useState } from 'react'
import { ChevronDown, MessageCircle, HelpCircle } from 'lucide-react'
import { cn, WA_DEFAULT } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const faqs = [
  {
    question: 'Como agendo minhas horas?',
    answer:
      'Você me chama pelo WhatsApp com pelo menos 24 horas de antecedência e a gente combina o horário. É simples assim — sem sistema, sem burocracia.',
  },
  {
    question: 'Posso fracionar o tempo em blocos menores?',
    answer:
      'Pode! O padrão é cada sessão ter 1 hora, mas isso é flexível: avisando com antecedência, dá para fazer sessões de 30 minutos também, se preferir. Você usa suas horas em sessões separadas conforme a sua necessidade.',
  },
  {
    question: 'As horas expiram?',
    answer:
      'Nunca. Suas horas são vitalícias — tenho alunos que compram um pacote e usam 1 hora por mês, e outros que voltam a usar só depois de 6 meses, quando realmente precisam. A ideia é exatamente essa: você usa quando fizer sentido para você, sem pressa e sem desperdiçar nada.',
  },
  {
    question: 'O que eu recebo depois de cada call?',
    answer:
      'Tanto na mentoria individual quanto na em grupo, você recebe a gravação completa da call, a transcrição e um resumo do que foi conversado. Assim fica fácil revisar os pontos importantes e colocar em prática depois.',
  },
  {
    question: 'Tirar dúvidas no WhatsApp consome o tempo da mentoria?',
    answer:
      'Não! As dúvidas que você manda pelo WhatsApp não descontam das suas horas. Pode perguntar à vontade — o tempo contratado é usado só nas calls ao vivo.',
  },
  {
    question: 'Tem grupo dos mentorados?',
    answer:
      'Sim. Cada turma tem um grupo fechado próprio, e você também ganha acesso ao grupo exclusivo com todos os meus mentorados e alunos, onde solto atualizações e novidades de forma antecipada.',
  },
  {
    question: 'Como funciona a entrega dos fluxos?',
    answer:
      'Você recebe fluxos prontos e validados, além dos novos que montamos juntos durante as aulas. O formato se adapta a você: posso ensinar o passo a passo para quem quer aprender a fazer, ajudar a desenvolver a lógica, dar a orientação de como funciona, ou até construir a lógica e te mandar o fluxo pronto. Importante: isso não é desenvolvimento direto no projeto do seu cliente — para esse tipo de trabalho é necessário entrar em contato para contratar meu serviço.',
  },
  {
    question: 'O conteúdo do curso é atualizado?',
    answer:
      'Sim, o conteúdo é atualizado semanalmente com projetos reais, novos fluxos e casos práticos. Você sempre terá acesso ao material mais recente sem custo adicional.',
  },
]

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  const half = Math.ceil(faqs.length / 2)
  const columns = [
    faqs.slice(0, half).map((faq, i) => ({ faq, index: i })),
    faqs.slice(half).map((faq, i) => ({ faq, index: i + half })),
  ]

  const renderItem = ({ faq, index }: { faq: (typeof faqs)[number]; index: number }) => {
    const isOpen = open === index
    return (
      <Reveal
        key={index}
        delay={index * 60}
        className={cn(
          'group glass-card rounded-2xl border border-emerald-200/80 transition-all duration-300 hover:-translate-y-0.5',
          isOpen ? 'border-emerald-300 shadow-glow' : 'hover:shadow-card',
        )}
      >
        <button
          onClick={() => setOpen(isOpen ? null : index)}
          className="w-full flex items-center justify-between gap-3 px-5 py-3.5 text-left"
          aria-expanded={isOpen}
        >
          <span
            className={cn(
              'font-grotesk font-semibold text-[15px] leading-snug transition-colors duration-300',
              isOpen ? 'text-emerald-700' : 'text-gray-900',
            )}
          >
            {faq.question}
          </span>
          <span
            className={cn(
              'flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300',
              isOpen
                ? 'gradient-cta shadow-glow'
                : 'bg-emerald-100/70 group-hover:bg-emerald-200/70',
            )}
          >
            <ChevronDown
              className={cn(
                'w-4 h-4 transition-transform duration-300',
                isOpen ? 'rotate-180 text-white' : 'text-emerald-600',
              )}
              strokeWidth={2.5}
            />
          </span>
        </button>
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isOpen ? 'max-h-[34rem]' : 'max-h-0',
          )}
        >
          <p className="font-dm text-gray-500 text-sm leading-relaxed px-5 pb-4">
            {faq.answer}
          </p>
        </div>
      </Reveal>
    )
  }

  return (
    <section id="faq" className="gradient-subtle py-24 px-6 relative overflow-hidden">
      {/* Decorative animated orbs */}
      <div
        className="animate-float pointer-events-none absolute -top-24 -left-16 w-[340px] h-[340px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />
      <div
        className="animate-float-slow pointer-events-none absolute bottom-0 -right-20 w-[300px] h-[300px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <Reveal className="text-center mb-14">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Dúvidas
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900">
            Perguntas Frequentes
          </h2>
        </Reveal>

        {/* Accordion em duas colunas independentes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3 items-start">
          {columns.map((col, c) => (
            <div key={c} className="space-y-3">
              {col.map(renderItem)}
            </div>
          ))}
        </div>

        {/* Card de fechamento — ainda com dúvidas */}
        <Reveal delay={120} className="mt-10">
          <div className="glass-card glass-border-glow rounded-3xl p-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl gradient-cta flex items-center justify-center mb-4 shadow-glow">
              <HelpCircle className="w-6 h-6 text-white" strokeWidth={1.75} />
            </div>
            <h3 className="font-grotesk font-bold text-gray-900 text-xl mb-2">
              Ficou com alguma dúvida?
            </h3>
            <p className="font-dm text-gray-500 text-sm leading-relaxed max-w-md mb-6">
              Me chama no WhatsApp que eu te respondo rápido — sem robôs e sem enrolação.
            </p>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 gradient-cta text-white font-dm font-semibold text-sm px-6 py-3.5 rounded-xl shadow-glow hover:scale-105 transition-transform duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Tirar dúvida no WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
