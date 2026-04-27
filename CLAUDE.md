# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Dev Commands

```bash
npm run dev      # Start Vite dev server (http://localhost:5173)
npm run build    # Production build
npm run preview  # Preview production build
```

## Architecture

**Stack:** React 19 + Vite + TailwindCSS v3 + React Router v7 + react-i18next + Lucide icons

**Pages:**
- `/` → Home — editorial hero with brand partners and services
- `/projects` → About — project portfolio grid
- `/blog` → Blog — article list

**i18n:** Language is stored in `localStorage` key `homeland-lang`. Supported: `en`, `zh`, `ja`. All UI strings live in `src/i18n/{lang}.json`. The `about` page references `projects.*` keys (e.g. `projects.filters`, `projects.statLabels`), not `about.*`.

**Styling:** TailwindCSS with custom tokens defined in `tailwind.config.js`. Key tokens: `bg-primary` (#F4F1EA), `accent` (#FF6A1A), `lime` (#D8F05C). Global utility classes in `src/index.css` include `container-content`, `paper-panel` (backdrop blur surface), `grid-frame`, `section-label`, `display-title`.

**Animation:** CSS keyframe utilities — `animate-fade-up` (staggered via inline `animationDelay`). Reduced-motion respected via `prefers-reduced-motion`.

## UI/UX Design Guidance

This project includes the **ui-ux-pro-max** skill at `.agents/skills/ui-ux-pro-max/`. It provides color palettes, typography pairings, UX guidelines, and design system generation via Python scripts:

```bash
# Generate design system recommendations
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system -p "HomelandV2"

# Query specific domains (style, color, typography, ux, etc.)
python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<keywords>" --domain <domain>
```

Key UI/UX rules from the skill to follow:
- Touch targets minimum 44×44px
- Animation duration 150–300ms; use `ease-out` entering, `ease-in` exiting
- Use Lucide SVG icons — never emoji as icons
- Color contrast minimum 4.5:1 for normal text
- All interactive elements need `cursor-pointer` in Tailwind

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Route definitions |
| `src/components/NavBar.jsx` | Fixed nav with marquee strip + mobile drawer |
| `src/components/Footer.jsx` | CTA section + copyright |
| `src/components/Button.jsx` | Unified button (primary/secondary/ghost) |
| `src/components/LanguageSwitcher.jsx` | i18n dropdown |
| `src/i18n/index.js` | i18next config + language detector |
| `tailwind.config.js` | Custom color tokens + animation keyframes |
| `src/index.css` | Global styles, paper-panel utility, reduced-motion |
| `DESIGN.md` | Design specification reference |

## Design Reference

- Aesthetic: light editorial — warm off-white (#F4F1EA) background with subtle grid lines, orange accent (#FF6A1A), lime green secondary (#D8F05C)
- Typography: Archivo for display headings, Inter for body text
- 72px background grid pattern, 120px overlay grid on cards
- References: 1.jpg (homepage layout), 2.jpg (projects/skills page) — both in repo root
