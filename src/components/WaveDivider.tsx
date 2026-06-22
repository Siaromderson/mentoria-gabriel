import { cn } from '@/lib/utils'

/**
 * Onda/curva SVG full-width para suavizar a emenda entre uma seção clara
 * (acima) e uma seção escura (abaixo). Renderiza-se logo acima do elemento
 * pai (que precisa ser `position: relative`), preenchida na cor da seção
 * escura, invadindo organicamente a seção clara de cima.
 *
 * Mesmo path em todos os usos para manter consistência visual.
 */
export default function WaveDivider({
  color,
  className,
}: {
  color: string
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-x-0 bottom-full w-full leading-none',
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block w-full h-[42px] sm:h-[56px]"
      >
        <path
          d="M0,30 C240,56 480,6 720,24 C960,42 1200,54 1440,22 L1440,56 L0,56 Z"
          fill={color}
        />
      </svg>
    </div>
  )
}
