import { MessageCircle, Handshake } from 'lucide-react'
import { WA_DEFAULT, WA_PARTNERSHIP } from '@/lib/utils'
import Reveal from '@/components/Reveal'

export default function CTASection() {
  return (
    <section id="contato" className="gradient-hero animate-gradient-pan py-24 px-6 relative overflow-hidden">
      {/* Decorative orbs */}
      <div
        className="animate-float pointer-events-none absolute top-0 right-0 w-[350px] h-[350px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #6ee7b7 0%, transparent 70%)' }}
      />
      <div
        className="animate-float-slow pointer-events-none absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      <Reveal className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Marca: logo + nome */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <img
            src="/logo.png"
            alt="SIAROM AI"
            className="h-12 w-auto drop-shadow-[0_4px_16px_rgba(52,211,153,0.35)]"
          />
          <span className="font-grotesk font-bold text-white text-xl tracking-tight">
            SIAROM AI
          </span>
        </div>

        <div className="inline-flex items-center gap-2 glass-dark text-emerald-100 text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Disponível agora
        </div>

        <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-white mb-5">
          Bora conversar?
        </h2>
        <p className="font-dm text-emerald-100/90 text-lg mb-10 leading-relaxed max-w-lg mx-auto">
          Me chama no WhatsApp, me conta o que você precisa e a gente combina o
          melhor formato.
        </p>

        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 bg-white text-emerald-700 font-semibold font-dm px-10 py-5 rounded-2xl text-lg shadow-glow hover:scale-105 hover:shadow-glow transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
          Chamar no WhatsApp
        </a>

        <p className="font-dm text-emerald-300/60 text-xs mt-6">
          Respondo rápido — sem robôs, sem enrolação.
        </p>

        {/* Parceria / projetos */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <h3 className="font-grotesk text-xl sm:text-2xl font-bold text-white mb-3">
            Quer fechar uma parceria ou contratar um projeto?
          </h3>
          <p className="font-dm text-emerald-100/90 text-base mb-7 leading-relaxed max-w-lg mx-auto">
            Se você tem uma ideia de parceria ou precisa desenvolver um projeto
            com IA e automação, vamos conversar sobre como posso te ajudar.
          </p>

          <a
            href={WA_PARTNERSHIP}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 glass-dark text-white font-semibold font-dm px-8 py-4 rounded-2xl text-base border border-white/20 hover:scale-105 transition-all duration-300"
          >
            <Handshake className="w-6 h-6 text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
            Falar sobre parceria ou projeto
          </a>
        </div>
      </Reveal>
    </section>
  )
}
