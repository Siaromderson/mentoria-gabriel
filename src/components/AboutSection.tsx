import { useState } from 'react'
import { Users, TrendingUp, Award, MessageCircle } from 'lucide-react'
import { WA_DEFAULT } from '@/lib/utils'
import Reveal from '@/components/Reveal'

const BRAND = '#1D9E75'

const stats = [
  { icon: Users, value: '+40', label: 'Mentorados' },
  { icon: TrendingUp, value: '+R$130k', label: 'Faturados com IA' },
  { icon: Award, value: '+50', label: 'Projetos entregues' },
]

export default function AboutSection() {
  const [imgError, setImgError] = useState(false)

  return (
    <section id="sobre" className="bg-white py-28 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* ─── Coluna esquerda: foto 4:5 com card de identidade ─── */}
        <Reveal className="relative w-full max-w-md mx-auto lg:mx-0">
          <div className="relative">
            {imgError ? (
              <div
                className="w-full aspect-[4/5] rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: BRAND }}
              >
                <span className="font-grotesk font-bold text-white text-7xl">GL</span>
              </div>
            ) : (
              <img
                src="/professor-gabriel.jpg"
                alt="Gabriel Lima — Professor de Automação com IA"
                onError={() => setImgError(true)}
                className="w-full aspect-[4/5] object-cover rounded-2xl"
                loading="lazy"
              />
            )}

            {/* Card flutuante de identidade — canto inferior */}
            <div className="absolute -bottom-5 left-5 right-5 sm:right-auto bg-white rounded-2xl shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)] px-5 py-4 flex items-center gap-3.5">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-grotesk font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: BRAND }}
              >
                GL
              </div>
              <div className="leading-tight">
                <p className="font-grotesk font-semibold text-gray-900 text-sm">
                  Gabriel Lima
                </p>
                <p className="font-dm text-gray-500 text-xs mt-0.5">
                  Professor na AI Makers
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─── Coluna direita: conteúdo ─── */}
        <Reveal delay={120}>
          {/* Label */}
          <p
            className="font-dm font-semibold text-xs uppercase tracking-[0.18em] mb-4"
            style={{ color: BRAND }}
          >
            Quem vai te ensinar
          </p>

          {/* Título */}
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900 mb-6 leading-[1.15]">
            Seu Professor é Quem Faz Acontecer
          </h2>

          {/* Bio */}
          <div className="space-y-4 font-dm text-gray-600 text-base leading-relaxed">
            <p>
              Sou o <strong className="text-gray-900">Gabriel Lima</strong>, professor na
              AI Makers e especialista em engenharia de automação com IA. Eu vivo disso
              todos os dias — já faturei{' '}
              <strong style={{ color: BRAND }}>mais de R$130 mil</strong> construindo
              projetos reais no mercado.
            </p>
            <p>
              Já <strong className="text-gray-900">ajudei mais de 40 mentorados</strong> a
              saírem do zero, dominarem o raciocínio das automações, fecharem contratos e
              organizarem suas operações. Aqui você aprende com{' '}
              <strong style={{ color: BRAND }}>cases reais</strong>, do primeiro contato
              com o cliente até a entrega.
            </p>
          </div>

          {/* Métricas */}
          <div className="grid grid-cols-3 gap-4 mt-10">
            {stats.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 bg-gray-50/60 p-5 text-center"
                >
                  <Icon
                    className="w-5 h-5 mx-auto mb-3"
                    strokeWidth={1.75}
                    style={{ color: BRAND }}
                  />
                  <p className="font-grotesk font-bold text-gray-900 text-xl sm:text-2xl">
                    {s.value}
                  </p>
                  <p className="font-dm text-gray-500 text-xs mt-1 leading-snug">
                    {s.label}
                  </p>
                </div>
              )
            })}
          </div>

          {/* CTA */}
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2.5 mt-10 text-white font-dm font-semibold text-sm px-7 py-4 rounded-xl transition-all duration-300 hover:brightness-110 hover:-translate-y-0.5"
            style={{ backgroundColor: BRAND }}
          >
            <MessageCircle className="w-4 h-4" />
            Quero ser mentorado
          </a>
        </Reveal>
      </div>
    </section>
  )
}
