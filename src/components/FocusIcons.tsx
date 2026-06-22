/**
 * Ícones SVG animados para a seção "Abordagem".
 * As animações disparam no hover do card pai (.focus-card) — ver index.css.
 */

const common = {
  viewBox: '0 0 24 24',
  className: 'w-7 h-7 anim-svg',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/** Cérebro pulsando com sinapses */
export function BrainIcon() {
  return (
    <svg {...common}>
      <g className="anim-brain">
        <path
          d="M9.5 3.5A2.5 2.5 0 0 0 7 6 2.5 2.5 0 0 0 5 8.5 2.5 2.5 0 0 0 5 13a2.5 2.5 0 0 0 2 4 2.5 2.5 0 0 0 2.5 1.5Z"
          fill="rgba(255,255,255,0.18)"
        />
        <path
          d="M14.5 3.5A2.5 2.5 0 0 1 17 6a2.5 2.5 0 0 1 2 2.5 2.5 2.5 0 0 1 0 4.5 2.5 2.5 0 0 1-2 4 2.5 2.5 0 0 1-2.5 1.5Z"
          fill="rgba(255,255,255,0.18)"
        />
        <line x1="12" y1="3.5" x2="12" y2="18.5" />
      </g>
      <circle className="anim-node anim-node-1" cx="8.5" cy="9" r="1.1" fill="#fff" stroke="none" />
      <circle className="anim-node anim-node-2" cx="12" cy="12.5" r="1.1" fill="#fff" stroke="none" />
      <circle className="anim-node anim-node-3" cx="15.5" cy="8.5" r="1.1" fill="#fff" stroke="none" />
    </svg>
  )
}

/** Mãozinha assinando um contrato */
export function SignIcon() {
  return (
    <svg {...common}>
      {/* documento */}
      <rect x="3" y="2.5" width="12" height="19" rx="1.5" fill="rgba(255,255,255,0.14)" />
      <line x1="6" y1="6" x2="12" y2="6" />
      <line x1="6" y1="9" x2="12" y2="9" />
      {/* assinatura sendo desenhada */}
      <path
        className="anim-sign"
        d="M5.5 16c1-2 2-2 2.6 0 .5 1.6 1.4 1.6 2-.2.5-1.5 1.4-1 2 .2"
        stroke="#fff"
        strokeWidth={1.4}
      />
      {/* mão + caneta */}
      <g className="anim-hand">
        {/* caneta */}
        <line x1="13" y1="20.5" x2="18" y2="12.5" stroke="#fff" strokeWidth={2} />
        <path d="M12.4 21.4l1.1-2 1 .6Z" fill="#fff" stroke="none" />
        {/* mãozinha segurando */}
        <path
          d="M17 11c1.2-.6 2.6.2 2.9 1.5.3 1.3-.5 2.3-1.7 2.8l-1.8.6-1.2-2.6Z"
          fill="rgba(255,255,255,0.92)"
          stroke="none"
        />
      </g>
    </svg>
  )
}

/** Arquivo entrando na pasta */
export function FolderIcon() {
  return (
    <svg {...common}>
      {/* fundo da pasta */}
      <path
        className="anim-folder"
        d="M3 7.5h5l1.8 2H21v9.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"
        fill="rgba(255,255,255,0.12)"
      />
      {/* arquivo que cai dentro */}
      <g className="anim-file">
        <rect x="8.5" y="2" width="7" height="8.5" rx="1" fill="rgba(255,255,255,0.22)" />
        <line x1="10" y1="5" x2="14" y2="5" strokeWidth={1.3} />
        <line x1="10" y1="7.3" x2="13" y2="7.3" strokeWidth={1.3} />
      </g>
      {/* frente da pasta (cobre o arquivo ao entrar) */}
      <path
        className="anim-folder"
        d="M3 10.5h18v8.5a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Z"
        fill="rgba(255,255,255,0.26)"
      />
    </svg>
  )
}
