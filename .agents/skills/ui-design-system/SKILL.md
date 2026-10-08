---
name: ui-design-system
description: Visual brand identity, editorial typography, color tokens, and upper-sheet design system preservation.
---

# Skill: UI Design System

## Core Responsibilities
1. **Preserve Brand Identity**: Protect the established purple identity (`#6947FF` brand primary, `#805EFF` dark accent, `#F2EEFF` subtle lavender).
2. **Maintain Editorial Layout**: Enforce editorial typography (`Space Grotesk`, `Inter`, `JetBrains Mono`), bold centered headlines, and balanced fluid leading.
3. **Upper-Sheet Architecture**: Maintain the signature physical layered sheet design on the landing page with bottom rounded corners (`rounded-b-[44px] sm:rounded-b-[72px] lg:rounded-b-[96px]`).
4. **Curvature Separation**: Ensure the background underneath the bottom curve provides gentle visual contrast against the upper sheet in both light mode (`#FFFFFF` against `#F1F0F6`) and dark mode (`#20202B` against `#0F0F15`).

---

## Design System Tokens & Classes

### Color Palette

| Token | Light Mode Value | Dark Mode Value | Usage |
| :--- | :--- | :--- | :--- |
| **Brand Primary** | `#6947FF` | `#805EFF` | Primary buttons, active tabs, brand accents |
| **Brand Hover** | `#5736EB` | `#6947FF` | Hover states on interactive actions |
| **Brand Subtle** | `#F2EEFF` / `#F0EBFF` | `#6947FF`/15 | Badge pills, selected capability controls |
| **Page Background** | `#F7F7F9` | `#101015` | Default page background for builder, results, docs |
| **Hero Upper Sheet**| `#FFFFFF` | `#20202B` | Landing hero upper sheet surface |
| **Landing Lower Stage**| `#F1F0F6` | `#0F0F15` | Landing lower stage background below hero |
| **Primary Surface** | `#FFFFFF` | `#161822` | Cards, capabilities container, deployment box |
| **Elevated Surface**| `#F8F7FC` | `#0D0E12` | Sub-boxes, code output boxes, preview cards |
| **Primary Text** | `#17171D` | `#F8F8FA` / `#FFFFFF` | Headings, bold metric titles, high-contrast text |
| **Secondary Text** | `#666675` | `#9496A6` / `#ACACBA` | Paragraphs, supporting descriptions, helper labels |
| **Border Subsystems** | `#E2E1EA` | `#242738` / `#414151` | Subtle container borders and column dividers |

### Component Classes (`src/styles/main.css`)
- `.btn-primary`: Rounded-full purple CTA with focus rings and active scale down (`active:scale-[0.98]`).
- `.btn-secondary`: Rounded-full bordered button adapting to light/dark surfaces.
- `.input-base`: Rounded-xl form input with purple focus ring.
- `.card-surface`: Rounded-2xl clean container with subtle shadow.

---

## Unacceptable Practices
- Do not introduce generic plain red/green/blue colors.
- Do not turn the upper sheet into a detached floating card.
- Do not remove the large bottom curvature on the upper sheet.
- Do not change font families from `Space Grotesk` / `Inter` / `JetBrains Mono`.
