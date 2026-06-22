import { useEffect, useRef } from 'react'

/**
 * Campo de partículas interativo.
 * As partículas formam uma malha sutil e se "desintegram" (são empurradas e
 * espalhadas) conforme o mouse passa por cima, voltando suavemente ao lugar.
 */
export default function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const el = canvasRef.current
    if (!el) return
    const context = el.getContext('2d')
    if (!context) return
    const canvas: HTMLCanvasElement = el
    const ctx: CanvasRenderingContext2D = context

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let raf = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    interface P {
      ox: number
      oy: number
      x: number
      y: number
      vx: number
      vy: number
      r: number
    }
    let particles: P[] = []

    const GAP = 38 // distância entre partículas
    const RADIUS = 120 // raio de influência do mouse
    const mouse = { x: -9999, y: -9999 }

    function build() {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      particles = []
      const cols = Math.ceil(width / GAP)
      const rows = Math.ceil(height / GAP)
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const ox = i * GAP
          const oy = j * GAP
          particles.push({ ox, oy, x: ox, y: oy, vx: 0, vy: 0, r: 1.3 })
        }
      }
    }

    function frame() {
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        // repulsão do mouse (desintegração)
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist = Math.hypot(dx, dy)
        if (dist < RADIUS && dist > 0.01) {
          const force = (1 - dist / RADIUS) * 6
          p.vx += (dx / dist) * force
          p.vy += (dy / dist) * force
        }
        // mola de volta para a posição original
        p.vx += (p.ox - p.x) * 0.045
        p.vy += (p.oy - p.y) * 0.045
        // atrito
        p.vx *= 0.86
        p.vy *= 0.86
        p.x += p.vx
        p.y += p.vy

        const disp = Math.hypot(p.x - p.ox, p.y - p.oy)
        const glow = Math.min(disp / 40, 1)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + glow * 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${110 + glow * 50}, ${231}, ${183}, ${0.25 + glow * 0.6})`
        ctx.fill()
      }
      raf = requestAnimationFrame(frame)
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    build()
    if (!reduced) {
      raf = requestAnimationFrame(frame)
    } else {
      // estado estático
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(110, 231, 183, 0.22)'
        ctx.fill()
      }
    }

    const parent = canvas.parentElement
    parent?.addEventListener('pointermove', onMove)
    parent?.addEventListener('pointerleave', onLeave)
    window.addEventListener('resize', build)

    return () => {
      cancelAnimationFrame(raf)
      parent?.removeEventListener('pointermove', onMove)
      parent?.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('resize', build)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
