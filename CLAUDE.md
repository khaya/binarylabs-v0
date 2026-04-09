# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Turbopack)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — run ESLint (flat config, ESLint 9)

## Tech Stack

- **Next.js 16** (App Router) — this version has breaking changes vs training data; always consult `node_modules/next/dist/docs/` before writing code
- **React 19** with Server Components by default
- **TypeScript** (strict mode)
- **Tailwind CSS v4** via `@tailwindcss/postcss` — uses `@import "tailwindcss"` and `@theme inline` syntax, not the v3 `@tailwind` directives or `tailwind.config.js`
- **ESLint 9** flat config (`eslint.config.mjs`) with `eslint-config-next` core-web-vitals + typescript presets

## Architecture

- `app/` — Next.js App Router: `layout.tsx` (root layout), `page.tsx` (home page), `globals.css` (dark-only global styles with JetBrains Mono)
- `public/` — static assets
- `@/*` path alias maps to project root (configured in `tsconfig.json`)
- CSS custom properties `--background`/`--foreground` are defined for a dark-only theme and mapped to Tailwind theme tokens via `@theme inline`
