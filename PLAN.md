# Binary Labs Website — Implementation Plan

## Overview

Single-page website for Binary Labs, a Johannesburg-based Cloud & AI Agentic Workflows consultancy. Terminal/cyberpunk aesthetic with dark theme, green accents, CRT effects, and premium polish.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4 · motion (Framer Motion v12)

---

## Part 1: Component Architecture & Layout

### File Organization

```
app/
  layout.tsx                    — Root layout (Server Component)
  page.tsx                      — Home page (Server Component) — composes all sections
  globals.css                   — Tailwind v4 + custom properties + keyframes
  components/
    ui/
      TerminalWindow.tsx        — Reusable terminal window chrome (Server Component)
      SectionWrapper.tsx        — Consistent section spacing/ID anchors (Server Component)
      GlowText.tsx              — Text with green glow effect (Server Component)
      CommandButton.tsx         — Terminal-styled CTA button (Server Component)
      ScanlineOverlay.tsx       — CSS-only CRT scanline overlay (Server Component)
    hero/
      HeroSection.tsx           — Hero layout container (Server Component)
      TypewriterPrompt.tsx      — Animated typing effect ("use client")
      AnimatedTerminal.tsx      — Right-side terminal with agentic workflow animation ("use client")
      HeroCTAs.tsx              — CTA buttons (Server Component)
    services/
      ServicesSection.tsx       — Grid layout for service cards (Server Component)
      ServiceCard.tsx           — Terminal-window card ("use client" for hover/reveal)
    why/
      WhySection.tsx            — Stats section (Server Component)
      AnimatedStat.tsx          — Counter/reveal animation ("use client")
    approach/
      ApproachSection.tsx       — Timeline container (Server Component)
      ApproachTimeline.tsx      — Animated step-by-step reveal ("use client")
    contact/
      ContactSection.tsx        — Outer layout (Server Component)
      ContactForm.tsx           — Form with state management ("use client")
    footer/
      Footer.tsx                — Static footer (Server Component)
    navigation/
      Navbar.tsx                — Fixed top nav with scroll-spy ("use client")
    MatrixRain.tsx              — Canvas-based binary rain background ("use client", ssr: false)
```

### Page Composition (`app/page.tsx` — Server Component)

```tsx
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <WhySection />
        <ApproachSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
```

Each section gets an `id` for smooth scroll navigation (e.g., `id="services"`, `id="contact"`).

### Server vs Client Component Breakdown

| Component | Type | Reason |
|-----------|------|--------|
| `layout.tsx` | Server | Static shell, font setup, metadata |
| `page.tsx` | Server | Composition only |
| `TerminalWindow` | Server | Pure presentational CSS |
| `SectionWrapper` | Server | Pure presentational |
| `ScanlineOverlay` | Server | CSS-only animation |
| `GlowText` | Server | CSS-only effect |
| `CommandButton` | Server | Static `<a>` tag |
| `HeroSection` | Server | Layout container |
| `HeroCTAs` | Server | Static anchor links |
| `TypewriterPrompt` | **Client** | useState, useEffect, timer |
| `AnimatedTerminal` | **Client** | motion animations, useEffect |
| `ServicesSection` | Server | Static grid layout |
| `ServiceCard` | **Client** | motion whileInView, hover |
| `WhySection` | Server | Static layout |
| `AnimatedStat` | **Client** | motion whileInView, counter |
| `ApproachSection` | Server | Static layout |
| `ApproachTimeline` | **Client** | motion staggered reveal |
| `ContactSection` | Server | Static wrapper |
| `ContactForm` | **Client** | useState, form handling |
| `Navbar` | **Client** | useState (mobile menu), scroll spy |
| `Footer` | Server | Fully static |
| `MatrixRain` | **Client** | Canvas API, requestAnimationFrame |

**8 Client Components out of 20 total** — keeps JS bundle minimal.

### Section Details

**Hero Section:** Full-viewport, two-column (text left, terminal right on desktop, stacked on mobile). Terminal prompt prefix `binarylabs@cloud:~$` with typing animation on headline. Right side shows animated terminal window with simulated agentic workflow output lines appearing one by one. CTAs: "Start a Project" (green glow, links to #contact) and "Book Strategy Call" (outlined).

**Services Section:** Heading styled as `> ls ./services`. Responsive grid (3 cols desktop, 1 mobile). Six cards in TerminalWindow chrome: Agentic AI Workflows Architecture, Multi-Agent Systems Design & Orchestration, Cloud-Native AI Platforms, Autonomous Agents + Tool Use + Memory Systems, AI Workflow Observability & Governance, Legacy System → Agentic Transformation.

**Why Binary Labs:** Terminal-style heading `> cat ./why-binary-labs`. Three stat blocks with green glow and counter-up animations: "Zero hallucinations in production", "40-60% faster agent deployment", "Enterprise-grade security & compliance".

**Our Approach:** Heading `> ./deploy --show-pipeline`. Vertical timeline with 5 steps connected by green line: Discovery → Agent Design → Orchestration → Hardening → Monitoring. Staggered reveal on scroll.

**Contact Form:** Terminal input interface. Fields: Name, Company, Email, Project Type (dropdown), Message. All inputs styled with dark bg, green border on focus, monospace font. Submit: `> SEND_TRANSMISSION`. Success state: "Transmission sent successfully. Status: RECEIVED [OK]".

**Navigation:** Sticky top bar with backdrop-blur. Logo left, section links right. Mobile: hamburger with slide-in overlay. Smooth scroll to anchors.

**Footer:** Minimal. Copyright, `binarylabs@cloud:~$ exit`, social links.

---

## Part 2: Styling System & Visual Effects

### Tailwind v4 Theme (`globals.css`)

```css
@import "tailwindcss";

:root {
  --background: #000000;
  --foreground: #ededed;
  --green: #00ff9f;
  --green-dim: #00cc7a;
  --green-bright: #22ff88;
  --cyan: #00e5ff;
  --cyan-dim: #0891b2;
  --surface: #0a0a0a;
  --surface-light: #111111;
  --border: #1a1a1a;
  --muted: #888888;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-green: var(--green);
  --color-green-dim: var(--green-dim);
  --color-green-bright: var(--green-bright);
  --color-cyan: var(--cyan);
  --color-cyan-dim: var(--cyan-dim);
  --color-surface: var(--surface);
  --color-surface-light: var(--surface-light);
  --color-border: var(--border);
  --color-muted: var(--muted);
  --font-mono: var(--font-jetbrains-mono), ui-monospace, monospace;

  --animate-blink: blink 1s step-end infinite;
  --animate-glitch: glitch 0.3s ease-in-out;
  --animate-scanline: scanline 8s linear infinite;
  --animate-glow-pulse: glow-pulse 2s ease-in-out infinite;
}
```

Dark-only: remove `@media (prefers-color-scheme: dark)` block. Set `:root` to dark values directly. Add `<meta name="color-scheme" content="dark">` via metadata.

### Font Setup (`layout.tsx`)

Replace Geist fonts with JetBrains Mono from `next/font/google`:

```tsx
import { JetBrains_Mono } from 'next/font/google'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})
```

Apply `jetbrainsMono.variable` to `<html>`. The entire site uses monospace as primary.

### CSS Keyframes & Effects

```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes glitch {
  0%   { transform: translate(0); }
  20%  { transform: translate(-2px, 2px); }
  40%  { transform: translate(-2px, -2px); }
  60%  { transform: translate(2px, 2px); }
  80%  { transform: translate(2px, -2px); }
  100% { transform: translate(0); }
}

@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes glow-pulse {
  0%, 100% { text-shadow: 0 0 10px #00ff9f80, 0 0 20px #00ff9f40; }
  50%      { text-shadow: 0 0 20px #00ff9fcc, 0 0 40px #00ff9f66, 0 0 60px #00ff9f33; }
}
```

### CSS Utility Classes

```css
/* Blinking terminal cursor */
.cursor-blink::after {
  content: "█";
  animation: blink 1s step-end infinite;
  color: var(--green);
}

/* Glitch hover (only on devices with hover) */
@media (hover: hover) {
  .glitch-hover:hover { animation: glitch 0.3s ease-in-out; }
}

/* Green glow text */
.text-glow {
  color: var(--green);
  text-shadow: 0 0 10px #00ff9f80, 0 0 20px #00ff9f40, 0 0 40px #00ff9f20;
}

/* CRT scanline overlay */
.scanline-overlay {
  pointer-events: none;
  position: fixed;
  inset: 0;
  z-index: 50;
  background: repeating-linear-gradient(
    0deg, transparent, transparent 2px,
    rgba(0, 255, 159, 0.03) 2px, rgba(0, 255, 159, 0.03) 4px
  );
}

/* Terminal-style border with subtle glow */
.terminal-border {
  border: 1px solid var(--border);
  box-shadow: 0 0 10px rgba(0, 255, 159, 0.05), inset 0 0 10px rgba(0, 0, 0, 0.3);
}

html { scroll-behavior: smooth; }
```

### Matrix/Binary Rain Background

Canvas-based Client Component (`ssr: false`):
- `<canvas>` with `position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.06`
- Draws columns of falling `0`/`1` characters in JetBrains Mono at ~10px
- Uses `requestAnimationFrame`, pauses when tab hidden
- On mobile (`< 768px`): reduce column count by 60% or disable entirely
- Target: < 1ms per frame

### Framer Motion Animation Strategy

Import from `motion/react`. Key patterns:

| Section | Animation |
|---------|-----------|
| Hero | Typewriter effect (custom hook), subtitle/CTA fade-up with delay |
| Services | Staggered card reveal (`staggerChildren: 0.1`), CSS glow on hover |
| Why Binary Labs | Counter animation (`useMotionValue` + `useTransform`), fade-up |
| Our Approach | Sequential step reveal with `whileInView` + stagger |
| Contact | Section scale 0.95→1.0 with fade, cursor blink in inputs |
| Nav | Backdrop blur toggle on scroll via `useScroll` |

Rules: Only animate `opacity` and `transform`. All `whileInView` use `viewport={{ once: true }}`. Never animate more than 10 elements simultaneously.

### Responsive Strategy

| Concern | Mobile (default) | md (768px+) | lg (1024px+) |
|---------|-----------------|-------------|-------------|
| Layout | Single column | 2-col grids | 3-col grids, max-w container |
| Typography | text-2xl heads | text-4xl heads | text-5xl/6xl heads |
| Scanline | Reduced opacity | Full effect | Full effect |
| Matrix rain | Disabled/reduced | Full | Full |
| Glitch hover | Disabled | Active | Active |
| Spacing | px-4 py-12 | px-8 py-20 | px-16 py-28 |
| Nav | Hamburger menu | Full horizontal | Full horizontal |

---

## Part 3: Dependencies, Data Flow & Technical Details

### Dependencies to Install

```bash
npm install motion
```

That's the only new runtime dependency. JetBrains Mono comes via `next/font/google` (built-in). Matrix rain is a custom canvas component.

### Contact Form Implementation

**Approach:** Client-side only with `useState` (no backend for MVP).

```typescript
interface FormData {
  name: string;
  company: string;
  email: string;
  projectType: string;
  message: string;
}
```

- Project Type options: Agentic AI Workflows, Multi-Agent Systems, Cloud-Native AI Platform, Legacy Transformation, Strategy Consultation, Other
- Validation: native HTML attributes (`required`, `type="email"`) + lightweight client-side function on submit
- Inline error messages per field
- On valid submit: set `submitted: true`, show green "Transmission Received" success state
- Future: refactor to `useActionState` with Server Action when backend is added

### SEO & Metadata

Static `metadata` export in `layout.tsx`:

```typescript
export const metadata: Metadata = {
  title: 'Binary Labs | Production-Grade AI Agentic Workflows on Cloud',
  description: 'Johannesburg-based Cloud & AI consultancy specialising in production-grade agentic AI workflows, multi-agent systems, and cloud-native AI platforms.',
  keywords: ['AI agents', 'agentic workflows', 'cloud AI', 'multi-agent systems', 'Johannesburg', 'AI consultancy'],
  openGraph: {
    title: 'Binary Labs | Production-Grade AI Agentic Workflows',
    description: 'Turning autonomous AI agents into reliable business infrastructure.',
    url: 'https://binarylabs.cloud',
    siteName: 'Binary Labs',
    locale: 'en_ZA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binary Labs',
    description: 'We Build Production-Grade AI Agentic Workflows on Cloud',
  },
};
```

JSON-LD `Organization` schema in `page.tsx` via `<script type="application/ld+json">`.

### Performance Considerations

- **Code splitting:** Server Component page composes Client Component leaves. Use `next/dynamic` with `ssr: false` for MatrixRain (canvas API).
- **Animation:** Only `opacity` + `transform`. `will-change: transform` only on actively animating elements. Canvas at reduced resolution scaled with CSS.
- **Bundle:** motion ~30-40KB gzipped (tree-shaken). No icon library — inline SVGs. JetBrains Mono subset to `latin`.
- **Images:** Minimal — terminal window is HTML/CSS. Any images use `next/image` with `priority` for above-fold.

---

## Implementation Order (Critical Path)

### Phase 1: Foundation
1. `npm install motion`
2. `app/globals.css` — Dark-only theme tokens, `@theme inline`, keyframes, utility classes
3. `app/layout.tsx` — JetBrains Mono font, metadata, dark-only HTML shell

### Phase 2: Shared UI
4. `TerminalWindow`, `SectionWrapper`, `ScanlineOverlay`, `GlowText`, `CommandButton`

### Phase 3: Background Effects
5. `MatrixRain.tsx` — Canvas binary rain (loaded with `next/dynamic`, `ssr: false`)

### Phase 4: Hero Section
6. `HeroSection`, `TypewriterPrompt`, `AnimatedTerminal`, `HeroCTAs`

### Phase 5: Content Sections (parallelizable)
7. `ServicesSection` + `ServiceCard`
8. `WhySection` + `AnimatedStat`
9. `ApproachSection` + `ApproachTimeline`

### Phase 6: Contact & Footer
10. `ContactForm` + `ContactSection`
11. `Footer`

### Phase 7: Navigation
12. `Navbar` with scroll-spy and mobile menu

### Phase 8: Composition & Polish
13. `page.tsx` — Wire all sections, add JSON-LD
14. Responsive testing, Lighthouse audit, animation fine-tuning

**Critical path:** globals.css → layout.tsx → shared UI → Hero → remaining sections → page composition → polish
