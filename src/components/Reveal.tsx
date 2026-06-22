import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  /** Elemento HTML renderizado. Default: div */
  as?: ElementType
  className?: string
  /** Atraso em ms para escalonar a entrada de itens em sequência */
  delay?: number
  /** Estilos extras mesclados ao transitionDelay */
  style?: CSSProperties
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

/**
 * Anima a entrada do conteúdo quando ele aparece na viewport.
 * Usa IntersectionObserver (sem dependências) e respeita prefers-reduced-motion
 * através do CSS em index.css ([data-reveal]).
 */
export default function Reveal({
  children,
  as,
  className,
  delay = 0,
  style,
  onMouseEnter,
  onMouseLeave,
}: RevealProps) {
  const Tag = (as ?? 'div') as ElementType
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-reveal=""
      className={cn(visible && 'is-visible', className)}
      style={{ ...(delay ? { transitionDelay: `${delay}ms` } : {}), ...style }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Tag>
  )
}
