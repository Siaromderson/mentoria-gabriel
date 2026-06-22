import { Instagram, Youtube, MessageCircle } from 'lucide-react'
import { WA_DEFAULT } from '@/lib/utils'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#planos', label: 'Planos' },
  { href: '#mentoria-grupo', label: 'Mentoria em Grupo' },
  { href: '#faq', label: 'FAQ' },
]

export default function Footer() {
  return (
    <footer className="relative bg-emerald-950 px-6 pt-16 pb-8">
      {/* Corte reto — sem divisor (baixo contraste entre os verdes não justifica a onda) */}

      {/* Orb decorativo (clipado p/ não vazar sobre a seção acima) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="animate-float-slow absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Bloco principal */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 lg:items-start justify-between">
          {/* Marca + tagline */}
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.png"
                alt="SIAROM AI"
                className="h-10 w-auto drop-shadow-[0_4px_16px_rgba(52,211,153,0.35)]"
              />
              <div className="leading-tight">
                <p className="font-grotesk font-semibold text-white text-base">SIAROM AI</p>
                <p className="font-dm text-emerald-400 text-xs">Gabriel Lima · Professor na AI Makers</p>
              </div>
            </div>
            <p className="font-dm text-emerald-200/70 text-sm leading-relaxed mb-5">
              Mentoria em engenharia de automação com IA — do raciocínio lógico ao
              fechamento de contratos, com projetos reais.
            </p>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 gradient-cta text-white font-dm font-semibold text-sm px-5 py-3 rounded-xl shadow-glow hover:scale-105 transition-transform duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>

          {/* Navegação */}
          <div>
            <p className="font-grotesk font-semibold text-emerald-100 text-sm mb-4">Navegação</p>
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-dm text-sm text-emerald-200/70 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Redes */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="https://www.instagram.com/gabriel_moraislima/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-900/60 border border-emerald-800/60 text-emerald-200 hover:bg-emerald-800 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.youtube.com/@gabrielmorais987"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-emerald-900/60 border border-emerald-800/60 text-emerald-200 hover:bg-emerald-800 hover:text-white hover:-translate-y-0.5 transition-all duration-200"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Linha inferior */}
        <div className="mt-12 pt-6 border-t border-emerald-900/70 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm text-emerald-600 text-xs">
            © {new Date().getFullYear()} SIAROM AI · Mentoria On-Demand
          </p>
          <p className="font-dm text-emerald-700 text-xs">
            Feito com foco em automação e IA.
          </p>
        </div>
      </div>
    </footer>
  )
}
