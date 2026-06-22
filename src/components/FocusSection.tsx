import Reveal from '@/components/Reveal'
import { BrainIcon, SignIcon, FolderIcon } from '@/components/FocusIcons'

const focuses = [
  {
    Icon: BrainIcon,
    title: 'Dominar o Raciocínio Lógico',
    description:
      'Desenvolva o pensamento sistêmico para estruturar qualquer automação, do simples ao altamente complexo.',
    zoom: false,
  },
  {
    Icon: SignIcon,
    title: 'Fechar Contratos',
    description:
      'Aprenda a precificar, apresentar e fechar projetos de automação com clientes que pagam bem.',
    zoom: false,
  },
  {
    Icon: FolderIcon,
    title: 'Organizar Projetos',
    description:
      'Estruture sua operação com processos claros, documentação e gestão que escalam sem virar caos.',
    zoom: true,
  },
]

export default function FocusSection() {
  return (
    <section id="abordagem" className="bg-white py-24 px-6 relative overflow-hidden">
      {/* Decorative animated orbs */}
      <div
        className="animate-float-slow pointer-events-none absolute top-10 -right-24 w-[380px] h-[380px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
      />
      <div
        className="animate-float pointer-events-none absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #34d399 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <Reveal className="text-center mb-6">
          <p className="text-emerald-600 font-dm font-medium text-sm uppercase tracking-widest mb-3">
            Abordagem
          </p>
          <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Foco Estratégico e Técnico
          </h2>
          <p className="font-dm text-gray-500 text-lg max-w-xl mx-auto">
            Não vamos apenas "mexer em nodes". Eu vou te ajudar a:
          </p>
        </Reveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {focuses.map((item, i) => {
            const Icon = item.Icon
            return (
              <Reveal
                key={i}
                delay={i * 100}
                className="focus-card group relative glass-card rounded-2xl p-8 hover:shadow-glow hover:-translate-y-1.5 transition-all duration-300 text-center cursor-default"
              >
                {/* Icon box with gradient */}
                <div
                  className={
                    'w-14 h-14 rounded-2xl gradient-cta flex items-center justify-center mx-auto mb-6 text-white transition-transform duration-300 shadow-glow ' +
                    (item.zoom
                      ? 'group-hover:scale-[1.28]'
                      : 'group-hover:scale-110 group-hover:rotate-3')
                  }
                >
                  <Icon />
                </div>
                <h3 className="font-grotesk font-semibold text-gray-900 text-lg mb-3">
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
