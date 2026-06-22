import { useEffect, useState } from 'react'
import { Menu, X, MessageCircle } from 'lucide-react'
import { cn, WA_DEFAULT } from '@/lib/utils'

const links = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#abordagem', label: 'Abordagem' },
  { href: '#projetos', label: 'Projetos' },
  { href: '#planos', label: 'Planos' },
  { href: '#mentoria-grupo', label: 'Mentoria em Grupo' },
  { href: '#faq', label: 'FAQ' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'py-2' : 'py-4',
      )}
    >
      <nav
        className={cn(
          'max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between rounded-2xl transition-all duration-300',
          scrolled
            ? 'glass-card py-2.5 mx-4 sm:mx-auto shadow-card'
            : 'py-2 bg-transparent border border-transparent',
        )}
      >
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <img
            src="/logo.png"
            alt="SIAROM AI"
            className="h-9 w-auto group-hover:scale-105 transition-transform duration-300"
          />
          <span
            className={cn(
              'font-grotesk font-semibold text-sm hidden sm:block transition-colors duration-300',
              scrolled ? 'text-gray-900' : 'text-white',
            )}
          >
            SIAROM AI
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  'font-dm text-sm px-3 py-2 rounded-lg transition-colors duration-200',
                  scrolled
                    ? 'text-gray-600 hover:text-emerald-700 hover:bg-emerald-50'
                    : 'text-emerald-100/90 hover:text-white hover:bg-white/10',
                )}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={WA_DEFAULT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 gradient-cta text-white font-dm font-semibold text-sm px-4 py-2 rounded-xl shadow-glow hover:scale-105 transition-transform duration-300"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className={cn(
              'lg:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-300',
              scrolled ? 'bg-emerald-50 text-emerald-700' : 'glass-dark text-white',
            )}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 px-4',
          open ? 'max-h-[480px] mt-2 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="mobile-menu-panel rounded-2xl p-3 max-w-6xl mx-auto">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block font-dm text-sm text-emerald-100/90 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-colors duration-200"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center gap-2 gradient-cta text-white font-dm font-semibold text-sm px-4 py-3 rounded-xl shadow-glow"
              >
                <MessageCircle className="w-4 h-4" />
                Falar no WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  )
}
