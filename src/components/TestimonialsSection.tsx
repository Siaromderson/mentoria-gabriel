import { MessageSquareQuote } from 'lucide-react'
import Reveal from '@/components/Reveal'

const testimonials = [
  { placeholder: true },
  { placeholder: true },
  { placeholder: true },
]

export default function TestimonialsSection() {
  return (
    <section id="depoimentos" className="gradient-alt py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Reveal className="text-center mb-16">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Resultados reais
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900">
            O Que Os Mentorados Dizem
          </h2>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((_, i) => (
            <Reveal
              key={i}
              delay={i * 100}
              className="glass-card rounded-2xl p-8 border-dashed flex flex-col items-center justify-center text-center min-h-[200px] gap-4 hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 flex items-center justify-center">
                <MessageSquareQuote className="w-6 h-6 text-emerald-400" strokeWidth={1.5} />
              </div>
              <p className="font-dm text-sm text-gray-400 italic leading-relaxed">
                Aguardando print do depoimento...
              </p>
            </Reveal>
          ))}
        </div>

        <p className="text-center font-dm text-xs text-gray-400 mt-8">
          Em breve os depoimentos dos mentorados serão exibidos aqui.
        </p>
      </div>
    </section>
  )
}
