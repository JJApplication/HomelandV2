# Design Specification - HomelandV2 Personal Website

## 1. Concept & Vision

A modern minimal personal homepage that embodies clean sophistication and subtle elegance. The design prioritizes content clarity, smooth interactions, and a premium feel through restraint and intentional whitespace. The aesthetic draws from high-end portfolio sites with a calm, inviting atmosphere.

**Core Slogan:** "Enjoy your life"

---

## 2. Design Language

### Aesthetic Direction
Minimal Modern — clean lines, generous whitespace, subtle depth through shadows and gradients. Dark theme foundation with light blue-purple accent color creating visual interest without overwhelming.

### Color Palette
```
Primary Background:    #0D0D0D (near black)
Secondary Background:  #1A1A1A (card surfaces)
Primary Accent:        #A5B4FC (light blue-purple, CSS: indigo-300)
Accent Hover:          #818CF8 (indigo-400)
Text Primary:          #FFFFFF
Text Secondary:        #A1A1AA (zinc-400)
Text Muted:            #71717A (zinc-500)
Border:                #27272A (zinc-800)
```

### Typography
- **Headings:** Inter (Google Fonts) - clean, modern sans-serif
- **Body:** Inter - consistent reading experience
- **Fallback:** system-ui, -apple-system, sans-serif

### Spacing System
- Base unit: 4px
- Section padding: 80px vertical (desktop), 48px (mobile)
- Component gaps: 16px, 24px, 32px
- Max content width: 1200px

### Motion Philosophy
- Subtle entrance animations (fade-up, 300ms ease-out)
- Button hover: scale(1.02), background shift
- Page transitions: smooth opacity fade
- No jarring or distracting animations

---

## 3. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────┐
│ Navigation Bar (fixed, blur backdrop)               │
│ [Logo]         [Home] [Blog] [About]    [🌐 Lang]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Hero Section (100vh)                               │
│  ┌───────────────────────────────────────────────┐ │
│  │  Background Image Placeholder Area            │ │
│  │                                              │ │
│  │         Enjoy your life                      │ │
│  │         [Subtitle text]                       │ │
│  │                                              │ │
│  │    [📧 Contact]  [GitHub]                    │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Footer CTA Section (above footer)                 │
│  "Let's work together"                              │
│  [📧 Email Contact]    [GitHub Profile]            │
└─────────────────────────────────────────────────────┘
```

### Pages
1. **Home** - Hero section with Slogan, brief intro, CTA buttons
2. **Blog** - Article listing page
3. **About** - Personal introduction, projects showcase, skills

### Responsive Strategy
- Desktop: Full layout, horizontal navigation
- Tablet (< 1024px): Adjusted spacing, collapsible menu
- Mobile (< 768px): Hamburger menu, stacked CTA buttons

---

## 4. Features & Interactions

### Navigation
- Fixed position with backdrop blur (rgba + blur effect)
- Active page indicator (underline or color change)
- Language switcher dropdown with flag icons

### Hero Section
- Full viewport height (100vh)
- Background image placeholder area (to be replaced later)
- Large heading with Slogan: "Enjoy your life"
- Subtitle: Brief personal tagline
- Two CTA buttons at bottom
- Fade-in animation on load (staggered: heading → subtitle → buttons)

### CTA Buttons
- Primary: Email/Contact (filled style)
- Secondary: GitHub (outlined style)
- Hover: slight scale + color shift
- Icons for visual clarity

### Footer
- Minimal copyright text
- Social links
- i18n language switcher

### Internationalization (i18n)
- Default language: English (en)
- Supported: English (en), Chinese (zh), Japanese (ja)
- Language stored in localStorage for persistence
- Smooth text transition on language change
- All UI strings externalized to translation files

---

## 5. Component Inventory

### NavBar
- **Default:** Dark background with subtle transparency
- **Scrolled:** More opaque background
- **Mobile:** Hamburger menu with slide-in drawer

### Button (Primary)
- **Default:** Indigo-300 background, white text, rounded-lg
- **Hover:** Indigo-400, scale(1.02)
- **Active:** Indigo-500
- **Disabled:** Opacity 50%, cursor not-allowed

### Button (Secondary/Outline)
- **Default:** Transparent with border, white text
- **Hover:** Subtle background fill, border brightens
- **Active:** Darker fill

### Language Switcher
- Dropdown with flag icons
- Current language displayed
- Hover: background highlight
- Options: 🇺🇸 English, 🇨🇳 中文, 🇯🇵 日本語

### Project Card (for About page)
- Image thumbnail area
- Title, description
- Tech stack tags
- Hover: slight lift (shadow increase)

### Skill Tag
- Rounded pill shape
- Icon + text
- Subtle background color

---

## 6. Technical Approach

### Stack
- **Framework:** React 18 (Vite for build tooling)
- **Styling:** TailwindCSS
- **Routing:** React Router v6
- **i18n:** react-i18next
- **State:** React Context (for language preference)

### Project Structure
```
src/
├── components/
│   ├── NavBar.jsx
│   ├── Button.jsx
│   ├── Footer.jsx
│   └── LanguageSwitcher.jsx
├── pages/
│   ├── Home.jsx
│   ├── Blog.jsx
│   └── About.jsx
├── i18n/
│   ├── en.json
│   ├── zh.json
│   └── ja.json
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

### Key Implementation Notes
- Use Tailwind's built-in dark mode utilities
- Flexbox/Grid for layouts
- CSS transitions for animations
- localStorage for language preference persistence
- No external UI library needed — custom components for simplicity

---

## 7. Content Strategy

### Home Page
- Slogan: "Enjoy your life"
- Brief tagline: "Creative developer crafting digital experiences"
- CTA: Contact + GitHub buttons

### About Page
- Introduction text
- Projects grid section (reference 2.jpg style)
- Skills section with tech tags

### Blog Page
- Article list layout
- Each item: title, date, excerpt

---

## 8. Design Reference

### Reference 1 (Homepage Layout)
- Dark theme with hero image placeholder area
- Fixed navigation with blur backdrop
- Bold slogan text
- Two prominent CTA buttons at bottom
- Clean, minimal aesthetic

### Reference 2 (Projects/Skills Page)
- Projects section with grid/list toggle
- Project cards with thumbnails
- Skills section with technology tags
- Consistent navigation style

### Color Adaptation
- Replace reference's orange (#F97316) with indigo tones (#A5B4FC, #818CF8)
- Maintain dark background consistency
- Keep typography clean and minimal