import Reveal from '@/components/Reveal'

interface Tool {
  name: string
  domain: string
  logo?: string // caminho local opcional (sobrescreve a logo externa)
}

const tools: Tool[] = [
  { name: 'n8n', domain: 'n8n.io' },
  { name: 'Claude', domain: 'claude.ai' },
  { name: 'Asaas', domain: 'asaas.com' },
  { name: 'Feegow', domain: 'feegow.com' },
  { name: 'Kommo', domain: 'kommo.com' },
  { name: 'HubSpot', domain: 'hubspot.com' },
  { name: 'Moskit', domain: 'moskitcrm.com' },
  { name: 'Apify', domain: 'apify.com' },
  { name: 'Google Calendar', domain: 'calendar.google.com' },
  { name: 'Google Sheets', domain: 'sheets.google.com' },
  { name: 'Supabase', domain: 'supabase.com' },
  { name: 'Cal.com', domain: 'cal.com' },
  { name: 'Calendly', domain: 'calendly.com' },
]

function LogoChip({ tool }: { tool: Tool }) {
  // Logo local (geralmente já inclui o nome da marca) — exibe maior, sem texto extra
  if (tool.logo) {
    return (
      <div className="flex items-center justify-center glass-card rounded-2xl px-6 py-4 mx-3 shrink-0 h-[72px] hover:-translate-y-1 transition-transform duration-300">
        <img
          src={tool.logo}
          alt={tool.name}
          loading="lazy"
          className="h-8 w-auto max-w-[140px] object-contain"
        />
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 glass-card rounded-2xl px-6 py-4 mx-3 shrink-0 h-[72px] hover:-translate-y-1 transition-transform duration-300">
      <img
        src={`https://logo.clearbit.com/${tool.domain}`}
        alt={tool.name}
        loading="lazy"
        className="w-8 h-8 object-contain rounded"
        onError={(e) => {
          // Fallback para o favicon caso a logo não carregue
          const img = e.currentTarget
          if (!img.dataset.fallback) {
            img.dataset.fallback = '1'
            img.src = `https://www.google.com/s2/favicons?domain=${tool.domain}&sz=64`
          }
        }}
      />
      <span className="font-grotesk font-semibold text-gray-800 text-base whitespace-nowrap">
        {tool.name}
      </span>
    </div>
  )
}

export default function IntegrationsSection() {
  // Duplicado para criar o loop contínuo da esteira
  const loop = [...tools, ...tools]

  return (
    <section id="integracoes" className="gradient-alt py-24 px-6 overflow-hidden relative">
      {/* Decorative animated orb */}
      <div
        className="animate-float-slow pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[460px] h-[460px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <Reveal className="text-center mb-14">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Integrações
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ferramentas dos Projetos Reais
          </h2>
          <p className="font-dm text-gray-500 text-base max-w-lg mx-auto">
            As integrações que já uso em projetos reais de clientes — e que você aprende
            a implementar na prática.
          </p>
        </Reveal>
      </div>

      {/* Esteira de logos */}
      <div className="marquee-mask relative w-full">
        <div className="flex w-max animate-marquee">
          {loop.map((tool, i) => (
            <LogoChip key={i} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
