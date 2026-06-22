import { useEffect, useRef } from 'react'

/* ─── Constantes editáveis ──────────────────────────────────────────── */
const COR_TOPO = '#fde68a' // dourado claro (topo da água)
const COR_MEIO = '#f59e0b' // dourado
const COR_BASE = '#7c2d12' // âmbar escuro (fundo)
const NIVEL = 62 // % da altura preenchida (padrão)
const ALTURA_ONDA = 10 // amplitude das ondas (px)
const VELOCIDADE = 1.4 // velocidade da animação
const BALANCO = 0.6 // velocidade do balanço lateral (sway)
const N_BOLHAS = 26 // quantidade de bolhas

interface LiquidCanvasProps {
  /** Nível de preenchimento (0-100). Sobrescreve NIVEL. */
  level?: number
  /** Intensidade do brilho/espuma (0-1). */
  glow?: number
  className?: string
}

interface Bubble {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  phase: number
}

export default function LiquidCanvas({ level, glow, className }: LiquidCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // refs com os valores mais recentes das props (lidos dentro do loop)
  const targetLevel = useRef(level ?? NIVEL)
  const targetGlow = useRef(glow ?? 0.3)
  targetLevel.current = level ?? NIVEL
  targetGlow.current = glow ?? 0.3

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const context = el.getContext('2d')
    if (!context) return
    const canvas = el
    const ctx = context

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    let width = 0
    let height = 0
    let raf = 0
    let t = 0
    let last = 0
    let curLevel = targetLevel.current
    let curGlow = targetGlow.current
    let bubbles: Bubble[] = []

    function rand(a: number, b: number, seed: number) {
      // pseudo-aleatório determinístico (Math.random é proibido no harness, mas aqui é runtime do browser; ainda assim usamos seed p/ estabilidade)
      const x = Math.sin(seed * 12.9898) * 43758.5453
      const f = x - Math.floor(x)
      return a + (b - a) * f
    }

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      bubbles = []
      for (let i = 0; i < N_BOLHAS; i++) {
        bubbles.push({
          x: rand(0, width, i + 1),
          y: rand(0, height, i + 7.3),
          r: rand(1.5, 5, i + 3.1),
          speed: rand(12, 40, i + 5.7),
          drift: rand(6, 20, i + 9.2),
          phase: rand(0, Math.PI * 2, i + 11.5),
        })
      }
    }

    // y da superfície numa posição x (px)
    function surfaceY(x: number, baseTop: number) {
      const p = (x / width) * Math.PI * 2
      const wave =
        Math.sin(p * 5 + t) * 1.0 +
        Math.sin(p * 2.4 - t * 1.3) * 0.55 +
        Math.sin(p * 9 + t * 0.7) * 0.25
      // balanço lateral: sobe numa borda e desce na outra
      const tilt = (x / width - 0.5) * Math.sin(t * BALANCO) * (height * 0.06)
      return baseTop + wave * ALTURA_ONDA + tilt
    }

    function draw(dt: number) {
      t += dt * VELOCIDADE
      // suaviza nível e brilho em direção ao alvo
      curLevel += (targetLevel.current - curLevel) * Math.min(1, dt * 3)
      curGlow += (targetGlow.current - curGlow) * Math.min(1, dt * 3)

      ctx.clearRect(0, 0, width, height)
      const baseTop = height * (1 - curLevel / 100)
      const step = 6

      // traça o caminho da água (superfície + corpo)
      ctx.beginPath()
      ctx.moveTo(0, height)
      let firstY = baseTop
      for (let x = 0; x <= width; x += step) {
        const y = surfaceY(x, baseTop)
        if (x === 0) firstY = y
        ctx.lineTo(x, y)
      }
      ctx.lineTo(width, height)
      ctx.closePath()

      // corpo com gradiente vertical de 3 paradas
      const grad = ctx.createLinearGradient(0, baseTop - ALTURA_ONDA, 0, height)
      grad.addColorStop(0, COR_TOPO)
      grad.addColorStop(0.45, COR_MEIO)
      grad.addColorStop(1, COR_BASE)
      ctx.save()
      ctx.globalAlpha = 0.7 + curGlow * 0.3
      ctx.fillStyle = grad
      ctx.fill()
      ctx.restore()

      // recorte para tudo que é desenhado "dentro" da água
      ctx.save()
      ctx.clip()

      // cáusticas (faixas de luz) atravessando a água
      ctx.globalCompositeOperation = 'overlay'
      for (let k = 0; k < 3; k++) {
        const cx = ((Math.sin(t * 0.3 + k * 2) * 0.5 + 0.5) * width) | 0
        const cg = ctx.createLinearGradient(cx - 120, 0, cx + 120, height)
        cg.addColorStop(0, 'rgba(255,255,255,0)')
        cg.addColorStop(0.5, `rgba(255,245,200,${0.12 + curGlow * 0.12})`)
        cg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = cg
        ctx.fillRect(0, baseTop, width, height - baseTop)
      }
      ctx.globalCompositeOperation = 'source-over'

      // bolhas brancas translúcidas subindo
      for (const b of bubbles) {
        b.y -= b.speed * dt
        const bx = b.x + Math.sin(t + b.phase) * b.drift
        const topHere = surfaceY(bx, baseTop)
        if (b.y < topHere - 4) {
          b.y = height + rand(0, 30, b.x)
          b.x = rand(0, width, b.y + b.phase)
        }
        const bg = ctx.createRadialGradient(bx, b.y, 0, bx, b.y, b.r)
        bg.addColorStop(0, 'rgba(255,255,255,0.55)')
        bg.addColorStop(0.7, 'rgba(255,255,255,0.15)')
        bg.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = bg
        ctx.beginPath()
        ctx.arc(bx, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      // linha de espuma/brilho na superfície (shadowBlur quente)
      ctx.save()
      ctx.beginPath()
      ctx.moveTo(0, firstY)
      for (let x = 0; x <= width; x += step) {
        ctx.lineTo(x, surfaceY(x, baseTop))
      }
      ctx.strokeStyle = `rgba(255,243,199,${0.5 + curGlow * 0.5})`
      ctx.lineWidth = 2
      ctx.shadowColor = 'rgba(251, 191, 36, 0.9)'
      ctx.shadowBlur = 14 + curGlow * 28
      ctx.stroke()
      ctx.restore()
    }

    function frame(now: number) {
      if (!last) last = now
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      draw(dt)
      raf = requestAnimationFrame(frame)
    }

    resize()
    if (reduced) {
      // desenho estático
      draw(0)
    } else {
      raf = requestAnimationFrame(frame)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
