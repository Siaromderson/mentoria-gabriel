# Mentoria On-Demand — Gabriel Lima

Landing page para mentoria individual on-demand de Engenharia de Automação com IA.

## Tecnologias

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- lucide-react (ícones)
- shadcn/ui (Radix UI — accordion)

## Como Rodar

### 1. Instalar Node.js

Baixe e instale o Node.js LTS em: https://nodejs.org/

### 2. Instalar dependências

Abra o terminal na pasta `mentoria-gabriel` e execute:

```bash
npm install
```

### 3. Rodar em modo desenvolvimento

```bash
npm run dev
```

Acesse em: http://localhost:5173

### 4. Build de produção

```bash
npm run build
npm run preview
```

## Estrutura

```
src/
  components/
    HeroSection.tsx        → Hero com CTA WhatsApp
    BenefitsSection.tsx    → 5 cards de benefícios
    FocusSection.tsx       → 3 cards de foco estratégico
    TestimonialsSection.tsx → Placeholders para depoimentos
    PricingSection.tsx     → 3 planos (Avulsa, 5h, 10h)
    FAQSection.tsx         → Accordion com 3 perguntas
    CTASection.tsx         → CTA final WhatsApp
    Footer.tsx             → Rodapé
  lib/
    utils.ts               → cn(), waLink(), WA_DEFAULT
  App.tsx
  index.css                → CSS variables + classes utilitárias
  main.tsx
index.html                 → SEO, Open Graph, Google Fonts
```

## Personalização

- **WhatsApp:** edite `WA_NUMBER` em `src/lib/utils.ts`
- **Depoimentos:** substitua os placeholders em `TestimonialsSection.tsx` com `<img>` das screenshots
- **Preços:** edite o array `plans` em `PricingSection.tsx`
